export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Admin - Discord" };

export default async function AdminDiscordPage() {
  const discordUsers = await db.discordUser.findMany({
    include: { user: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Discord</h1>
        <Badge variant="outline">{discordUsers.length} forbundne</Badge>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Bruger</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Discord</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Server</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Rolle</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Forbundet</th>
                </tr>
              </thead>
              <tbody>
                {discordUsers.map((du) => (
                  <tr key={du.id} className="border-b border-white/5">
                    <td className="px-6 py-4">
                      <p className="text-sm text-white">{du.user.name}</p>
                      <p className="text-xs text-gray-500">{du.user.email}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">{du.discordUsername}</td>
                    <td className="px-6 py-4">
                      <Badge variant={du.guildJoined ? "success" : "outline"}>
                        {du.guildJoined ? "Ja" : "Nej"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={du.roleAssigned ? "success" : "outline"}>
                        {du.roleAssigned ? "Tildelt" : "Mangler"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(du.createdAt)}
                    </td>
                  </tr>
                ))}
                {discordUsers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      Ingen Discord-brugere endnu
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
