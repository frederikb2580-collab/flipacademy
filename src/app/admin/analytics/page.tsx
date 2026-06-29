export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { BarChart3, Users, ShoppingBag, TrendingUp } from "lucide-react";

export const metadata = { title: "Admin - Statistik" };

export default async function AdminAnalyticsPage() {
  const [totalUsers, totalOrders, revenue, refunds, monthlyOrders] =
    await Promise.all([
      db.user.count(),
      db.order.count({ where: { status: "COMPLETED" } }),
      db.order.aggregate({
        where: { status: "COMPLETED" },
        _sum: { amount: true },
      }),
      db.order.count({ where: { status: "REFUNDED" } }),
      db.order.groupBy({
        by: ["createdAt"],
        where: { status: "COMPLETED" },
        _sum: { amount: true },
        _count: true,
      }),
    ]);

  const avgOrderValue =
    totalOrders > 0
      ? Math.round((revenue._sum.amount ?? 0) / totalOrders)
      : 0;

  const conversionRate =
    totalUsers > 0
      ? ((totalOrders / totalUsers) * 100).toFixed(1)
      : "0";

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Statistik</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total omsætning</p>
                <p className="text-2xl font-bold text-white">
                  {formatPrice(revenue._sum.amount ?? 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Gns. ordreværdi</p>
                <p className="text-2xl font-bold text-white">
                  {formatPrice(avgOrderValue)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Konverteringsrate</p>
                <p className="text-2xl font-bold text-white">
                  {conversionRate}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-red-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Refunderinger</p>
                <p className="text-2xl font-bold text-white">{refunds}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
