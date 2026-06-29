export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Admin - Emails" };

export default async function AdminEmailsPage() {
  const emails = await db.emailLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Email log</h1>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Til</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Emne</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Dato</th>
                </tr>
              </thead>
              <tbody>
                {emails.map((email) => (
                  <tr key={email.id} className="border-b border-white/5">
                    <td className="px-6 py-4 text-sm text-white">{email.to}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{email.subject}</td>
                    <td className="px-6 py-4">
                      <Badge variant={email.status === "sent" ? "success" : "destructive"}>
                        {email.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(email.createdAt)}
                    </td>
                  </tr>
                ))}
                {emails.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                      Ingen emails sendt endnu
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
