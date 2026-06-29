export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export const metadata = { title: "Mine Kurser" };

export default async function CoursesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const courses = await db.course.findMany({
    where: {
      orders: { some: { userId: session.user.id, status: "COMPLETED" } },
    },
    include: {
      modules: { include: { lessons: true } },
    },
  });

  const progress = await db.progress.findMany({
    where: { userId: session.user.id, completed: true },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Mine kurser</h1>

      {courses.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Ingen kurser endnu
            </h3>
            <p className="text-gray-400">
              Køb et kursus for at komme i gang med at lære
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => {
            const totalLessons = course.modules.reduce(
              (a, m) => a + m.lessons.length,
              0
            );
            const completed = progress.filter(
              (p) => p.courseId === course.id
            ).length;
            const percent =
              totalLessons > 0
                ? Math.round((completed / totalLessons) * 100)
                : 0;

            return (
              <Link key={course.id} href={`/courses/${course.slug}`}>
                <Card className="hover:border-purple-500/30 transition-all hover:-translate-y-1 cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{course.title}</CardTitle>
                      {percent === 100 ? (
                        <Badge variant="success">Færdig</Badge>
                      ) : percent > 0 ? (
                        <Badge>{percent}%</Badge>
                      ) : (
                        <Badge variant="outline">Ikke startet</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-400 mb-4">
                      {course.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span>{course.modules.length} moduler</span>
                      <span>{totalLessons} lektioner</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
