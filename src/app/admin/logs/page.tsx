export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Admin - Logs" };

export default async function AdminLogsPage() {
  const logs = await db.log.findMany({
    include: { user: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Logs</h1>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Handling</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Bruger</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Detaljer</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Dato</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="border-b border-white/5">
                    <td className="px-6 py-4">
                      <Badge variant="outline">{log.action}</Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {log.user?.name ?? log.user?.email ?? "System"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {log.details}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(log.createdAt)}
                    </td>
                  </tr>
                ))}
                {logs.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                      Ingen logs endnu
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
