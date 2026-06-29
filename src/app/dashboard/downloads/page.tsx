export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

export const metadata = { title: "Downloads" };

export default async function DownloadsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const files = await db.file.findMany({
    where: {
      lesson: {
        module: {
          course: {
            orders: {
              some: { userId: session.user.id, status: "COMPLETED" },
            },
          },
        },
      },
    },
    include: {
      lesson: {
        include: {
          module: { include: { course: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Downloads</h1>

      {files.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Download className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Ingen downloads
            </h3>
            <p className="text-gray-400">
              Downloadbare filer fra dine kurser vises her
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {files.map((file) => (
            <Card key={file.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {file.lesson.module.course.title} &middot;{" "}
                        {file.lesson.title}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <a href={file.url} download>
                      <Download className="h-4 w-4" />
                    </a>
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
