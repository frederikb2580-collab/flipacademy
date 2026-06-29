export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ShoppingBag, TrendingUp, MessageSquare } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const [orders, progress, courses, discordUser] = await Promise.all([
    db.order.findMany({
      where: { userId: session.user.id, status: "COMPLETED" },
      include: { course: true },
    }),
    db.progress.findMany({
      where: { userId: session.user.id, completed: true },
    }),
    db.course.findMany({
      where: {
        orders: { some: { userId: session.user.id, status: "COMPLETED" } },
      },
      include: {
        modules: { include: { lessons: true } },
        _count: { select: { modules: true } },
      },
    }),
    db.discordUser.findUnique({ where: { userId: session.user.id } }),
  ]);

  const totalLessons = courses.reduce(
    (acc, c) => acc + c.modules.reduce((a, m) => a + m.lessons.length, 0),
    0
  );
  const completedLessons = progress.length;
  const progressPercent =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Velkommen tilbage, {session.user.name?.split(" ")[0]}!
        </h1>
        <p className="text-gray-400 mt-1">
          Her er et overblik over din fremgang
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Kurser</p>
                <p className="text-2xl font-bold text-white">
                  {courses.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Fremgang</p>
                <p className="text-2xl font-bold text-white">
                  {progressPercent}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Ordrer</p>
                <p className="text-2xl font-bold text-white">
                  {orders.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-indigo-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Discord</p>
                <p className="text-lg font-bold text-white">
                  {discordUser?.roleAssigned ? (
                    <Badge variant="success">Forbundet</Badge>
                  ) : (
                    <Badge variant="outline">Ikke forbundet</Badge>
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {courses.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Mine kurser</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course) => {
              const courseLessons = course.modules.reduce(
                (a, m) => a + m.lessons.length,
                0
              );
              const courseCompleted = progress.filter(
                (p) => p.courseId === course.id
              ).length;
              const coursePercent =
                courseLessons > 0
                  ? Math.round((courseCompleted / courseLessons) * 100)
                  : 0;

              return (
                <Link key={course.id} href={`/courses/${course.slug}`}>
                  <Card className="hover:border-purple-500/30 transition-colors cursor-pointer">
                    <CardHeader>
                      <CardTitle>{course.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-400 mb-4">
                        {course._count.modules} moduler &middot; {courseLessons}{" "}
                        lektioner
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Fremgang</span>
                          <span className="text-white">{coursePercent}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all"
                            style={{ width: `${coursePercent}%` }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {courses.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Ingen kurser endnu
            </h3>
            <p className="text-gray-400 mb-6">
              Køb dit første kursus for at komme i gang
            </p>
            <Link
              href="/#pris"
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 text-sm font-medium text-white hover:from-purple-500 hover:to-blue-500 transition-colors"
            >
              Se kurser
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
