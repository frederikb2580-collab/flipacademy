export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Favoritter" };

export default async function FavoritesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const favorites = await db.favorite.findMany({
    where: { userId: session.user.id },
    include: { course: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Favoritter</h1>

      {favorites.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Heart className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Ingen favoritter endnu
            </h3>
            <p className="text-gray-400">
              Marker kurser som favoritter for at finde dem hurtigt
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {favorites.map((fav) => (
            <Link key={fav.id} href={`/courses/${fav.course.slug}`}>
              <Card className="hover:border-purple-500/30 transition-all hover:-translate-y-1 cursor-pointer">
                <CardHeader>
                  <CardTitle>{fav.course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400">
                    {fav.course.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
