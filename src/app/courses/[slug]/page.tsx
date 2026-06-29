export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import Link from "next/link";
import {
  PlayCircle,
  FileText,
  File,
  HelpCircle,
  CheckCircle2,
  Lock,
  ChevronRight,
} from "lucide-react";

const typeIcons: Record<string, typeof PlayCircle> = {
  VIDEO: PlayCircle,
  TEXT: FileText,
  PDF: File,
  QUIZ: HelpCircle,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await db.course.findUnique({ where: { slug } });
  if (!course) return { title: "Kursus ikke fundet" };
  return {
    title: course.title,
    description: course.description,
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await getServerSession(authOptions);

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

  const hasAccess = session?.user?.id
    ? await db.order.findFirst({
        where: {
          userId: session.user.id,
          courseId: course.id,
          status: "COMPLETED",
        },
      })
    : null;

  const progress = session?.user?.id
    ? await db.progress.findMany({
        where: {
          userId: session.user.id,
          courseId: course.id,
          completed: true,
        },
      })
    : [];

  const completedLessonIds = new Set(progress.map((p) => p.lessonId));
  const totalLessons = course.modules.reduce(
    (a, m) => a + m.lessons.length,
    0
  );
  const completedCount = completedLessonIds.size;
  const percent =
    totalLessons > 0
      ? Math.round((completedCount / totalLessons) * 100)
      : 0;

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">{course.title}</h1>
            {course.description && (
              <p className="text-gray-400 mt-2">{course.description}</p>
            )}

            {hasAccess && (
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">
                    {completedCount} af {totalLessons} lektioner gennemført
                  </span>
                  <span className="text-white">{percent}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {course.modules.map((mod, modIndex) => (
              <Card key={mod.id}>
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-purple-400">
                      Modul {modIndex + 1}
                    </span>
                    <h2 className="text-lg font-semibold text-white">
                      {mod.title}
                    </h2>
                    <Badge variant="outline" className="ml-auto">
                      {mod.lessons.length} lektioner
                    </Badge>
                  </div>
                  {mod.description && (
                    <p className="text-sm text-gray-400 mt-2">
                      {mod.description}
                    </p>
                  )}
                </div>
                <CardContent className="p-0">
                  <ul className="divide-y divide-white/5">
                    {mod.lessons.map((lesson) => {
                      const Icon = typeIcons[lesson.type] ?? PlayCircle;
                      const isCompleted = completedLessonIds.has(lesson.id);

                      return (
                        <li key={lesson.id}>
                          {hasAccess ? (
                            <Link
                              href={`/courses/${slug}/lessons/${lesson.id}`}
                              className="flex items-center gap-4 px-6 py-4 hover:bg-white/5 transition-colors"
                            >
                              {isCompleted ? (
                                <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" />
                              ) : (
                                <Icon className="h-5 w-5 text-gray-500 shrink-0" />
                              )}
                              <div className="flex-1 min-w-0">
                                <p
                                  className={`text-sm font-medium ${
                                    isCompleted ? "text-gray-400" : "text-white"
                                  }`}
                                >
                                  {lesson.title}
                                </p>
                                {lesson.duration && (
                                  <p className="text-xs text-gray-500">
                                    {Math.ceil(lesson.duration / 60)} min
                                  </p>
                                )}
                              </div>
                              <ChevronRight className="h-4 w-4 text-gray-600" />
                            </Link>
                          ) : (
                            <div className="flex items-center gap-4 px-6 py-4 opacity-50">
                              <Lock className="h-5 w-5 text-gray-600 shrink-0" />
                              <span className="text-sm text-gray-500">
                                {lesson.title}
                              </span>
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
