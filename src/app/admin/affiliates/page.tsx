export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatDate } from "@/lib/utils";

export const metadata = { title: "Admin - Affiliates" };

export default async function AdminAffiliatesPage() {
  const affiliates = await db.affiliateCode.findMany({
    include: {
      user: { select: { name: true, email: true } },
      _count: { select: { referrals: true } },
    },
    orderBy: { totalEarned: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Affiliates</h1>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Bruger</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Kode</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Provision %</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Henvisninger</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Optjent</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Udbetalt</th>
                </tr>
              </thead>
              <tbody>
                {affiliates.map((aff) => (
                  <tr key={aff.id} className="border-b border-white/5">
                    <td className="px-6 py-4">
                      <p className="text-sm text-white">{aff.user.name ?? aff.user.email}</p>
                      <p className="text-xs text-gray-500">{aff.user.email}</p>
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-purple-400">{aff.code}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{aff.commissionRate}%</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{aff._count.referrals}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-white">
                      {formatPrice(aff.totalEarned)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {formatPrice(aff.totalPaid)}
                    </td>
                  </tr>
                ))}
                {affiliates.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      Ingen affiliates endnu
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
