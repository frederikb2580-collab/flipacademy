export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatDate } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";

export const metadata = { title: "Købshistorik" };

const statusMap: Record<string, { label: string; variant: "success" | "default" | "destructive" | "warning" }> = {
  COMPLETED: { label: "Gennemført", variant: "success" },
  PENDING: { label: "Afventer", variant: "warning" },
  REFUNDED: { label: "Refunderet", variant: "destructive" },
  FAILED: { label: "Fejlet", variant: "destructive" },
};

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const orders = await db.order.findMany({
    where: { userId: session.user.id },
    include: { course: true, coupon: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Købshistorik</h1>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <ShoppingBag className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Ingen ordrer endnu
            </h3>
            <p className="text-gray-400">
              Dine køb vises her når du har foretaget et køb
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const status = statusMap[order.status] ?? statusMap.PENDING;
            return (
              <Card key={order.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-white">
                        {order.course.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {formatDate(order.createdAt)}
                      </p>
                      {order.coupon && (
                        <p className="text-xs text-purple-400 mt-1">
                          Rabatkode: {order.coupon.code}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={status.variant}>{status.label}</Badge>
                      <span className="text-lg font-bold text-white">
                        {formatPrice(order.amount)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
