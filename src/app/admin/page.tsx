export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import {
  Users,
  ShoppingBag,
  DollarSign,
  BookOpen,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

export const metadata = { title: "Admin" };

export default async function AdminPage() {
  const [totalUsers, totalOrders, totalRevenue, totalCourses, recentOrders] =
    await Promise.all([
      db.user.count(),
      db.order.count({ where: { status: "COMPLETED" } }),
      db.order.aggregate({
        where: { status: "COMPLETED" },
        _sum: { amount: true },
      }),
      db.course.count(),
      db.order.findMany({
        where: { status: "COMPLETED" },
        include: { user: true, course: true },
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
    ]);

  const stats = [
    {
      label: "Brugere",
      value: totalUsers.toString(),
      icon: Users,
      color: "purple",
    },
    {
      label: "Ordrer",
      value: totalOrders.toString(),
      icon: ShoppingBag,
      color: "blue",
    },
    {
      label: "Omsætning",
      value: formatPrice(totalRevenue._sum.amount ?? 0),
      icon: DollarSign,
      color: "green",
    },
    {
      label: "Kurser",
      value: totalCourses.toString(),
      icon: BookOpen,
      color: "orange",
    },
  ];

  const colorMap: Record<string, string> = {
    purple: "bg-purple-500/10 text-purple-400",
    blue: "bg-blue-500/10 text-blue-400",
    green: "bg-green-500/10 text-green-400",
    orange: "bg-orange-500/10 text-orange-400",
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-gray-400 mt-1">Overblik over din platform</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div
                  className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                    colorMap[stat.color]
                  }`}
                >
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Seneste ordrer
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentOrders.length === 0 ? (
            <p className="text-gray-500 text-sm">Ingen ordrer endnu</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-semibold">
                      {order.user.name?.charAt(0) ?? "U"}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {order.user.name ?? order.user.email}
                      </p>
                      <p className="text-xs text-gray-500">
                        {order.course.title}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">
                      {formatPrice(order.amount)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString("da-DK")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
