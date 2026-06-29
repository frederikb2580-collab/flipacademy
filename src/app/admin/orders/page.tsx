export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatDate } from "@/lib/utils";

export const metadata = { title: "Admin - Ordrer" };

const statusMap: Record<string, { label: string; variant: "success" | "default" | "destructive" | "warning" }> = {
  COMPLETED: { label: "Gennemført", variant: "success" },
  PENDING: { label: "Afventer", variant: "warning" },
  REFUNDED: { label: "Refunderet", variant: "destructive" },
  FAILED: { label: "Fejlet", variant: "destructive" },
};

export default async function AdminOrdersPage() {
  const orders = await db.order.findMany({
    include: {
      user: true,
      course: true,
      coupon: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const totalRevenue = orders
    .filter((o) => o.status === "COMPLETED")
    .reduce((sum, o) => sum + o.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Ordrer</h1>
        <div className="text-right">
          <p className="text-sm text-gray-400">Total omsætning</p>
          <p className="text-xl font-bold text-white">{formatPrice(totalRevenue)}</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Bruger</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Kursus</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Beløb</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Rabatkode</th>
                  <th className="text-left text-xs font-medium text-gray-400 px-6 py-3">Dato</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const status = statusMap[order.status] ?? statusMap.PENDING;
                  return (
                    <tr key={order.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="px-6 py-4">
                        <p className="text-sm text-white">{order.user.name ?? order.user.email}</p>
                        <p className="text-xs text-gray-500">{order.user.email}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">{order.course.title}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-white">
                        {formatPrice(order.amount)}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {order.coupon?.code ?? "—"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(order.createdAt)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
