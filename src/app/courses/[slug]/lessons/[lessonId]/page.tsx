export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { LessonContent } from "@/components/course/lesson-content";
import { LessonNavigation } from "@/components/course/lesson-navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lessonId: string }>;
}) {
  const { lessonId } = await params;
  const lesson = await db.lesson.findUnique({ where: { id: lessonId } });
  if (!lesson) return { title: "Lektion ikke fundet" };
  return { title: lesson.title };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; lessonId: string }>;
}) {
  const { slug, lessonId } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const course = await db.course.findUnique({
    where: { slug },
    include: {
      modules: {
        where: { published: true },
        orderBy: { order: "asc" },
        include: {
          lessons: {
            where: { published: true },
            orderBy: { order: "asc" },
          },
        },
      },
    },
  });

  if (!course) notFound();

  const hasAccess = await db.order.findFirst({
    where: {
      userId: session.user.id,
      courseId: course.id,
      status: "COMPLETED",
    },
  });

  if (!hasAccess) redirect(`/courses/${slug}`);

  const lesson = await db.lesson.findUnique({
    where: { id: lessonId },
    include: { files: true, quizzes: { include: { options: true } } },
  });

  if (!lesson) notFound();

  const allLessons = course.modules.flatMap((m) => m.lessons);
  const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const progress = await db.progress.findUnique({
    where: {
      userId_lessonId: {
        userId: session.user.id,
        lessonId,
      },
    },
  });

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href={`/courses/${slug}`}
            className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ChevronLeft className="h-4 w-4" />
            Tilbage til {course.title}
          </Link>

          <h1 className="text-2xl font-bold text-white mb-6">
            {lesson.title}
          </h1>

          <Card>
            <CardContent className="p-6">
              <LessonContent
                lesson={{
                  id: lesson.id,
                  title: lesson.title,
                  type: lesson.type,
                  content: lesson.content,
                  videoUrl: lesson.videoUrl,
                  files: lesson.files,
                  quizzes: lesson.quizzes,
                }}
                courseId={course.id}
                isCompleted={progress?.completed ?? false}
              />
            </CardContent>
          </Card>

          <LessonNavigation
            slug={slug}
            prevLesson={prevLesson}
            nextLesson={nextLesson}
          />
        </div>
      </main>
    </>
  );
}
