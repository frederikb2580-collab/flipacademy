export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatDate } from "@/lib/utils";
import Link from "next/link";
import { Plus, BookOpen, Edit } from "lucide-react";

export const metadata = { title: "Admin - Kurser" };

export default async function AdminCoursesPage() {
  const courses = await db.course.findMany({
    include: {
      _count: { select: { modules: true, orders: true } },
    },
    orderBy: { order: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Kurser</h1>
        <Button asChild>
          <Link href="/admin/courses/new">
            <Plus className="mr-2 h-4 w-4" />
            Nyt kursus
          </Link>
        </Button>
      </div>

      {courses.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Ingen kurser endnu
            </h3>
            <p className="text-gray-400">Opret dit første kursus for at komme i gang</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {courses.map((course) => (
            <Card key={course.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-white">
                        {course.title}
                      </h3>
                      <Badge variant={course.published ? "success" : "outline"}>
                        {course.published ? "Publiceret" : "Kladde"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400">
                      {course._count.modules} moduler &middot;{" "}
                      {course._count.orders} salg &middot;{" "}
                      {formatPrice(course.price)}
                    </p>
                    <p className="text-xs text-gray-500">
                      Oprettet {formatDate(course.createdAt)}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/courses/${course.id}`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Rediger
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
