export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, CheckCircle2, ExternalLink } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Discord" };

export default async function DiscordPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const discordUser = await db.discordUser.findUnique({
    where: { userId: session.user.id },
  });

  const hasAccess = await db.order.findFirst({
    where: { userId: session.user.id, status: "COMPLETED" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Discord</h1>

      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Discord Community
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {discordUser ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-indigo-400" />
                </div>
                <div>
                  <p className="font-medium text-white">
                    {discordUser.discordUsername}
                  </p>
                  <div className="flex gap-2 mt-1">
                    {discordUser.guildJoined && (
                      <Badge variant="success">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        I serveren
                      </Badge>
                    )}
                    {discordUser.roleAssigned && (
                      <Badge>Medlem rolle</Badge>
                    )}
                  </div>
                </div>
              </div>

              <Button variant="secondary" asChild>
                <a
                  href="https://discord.gg/flipacademy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Åbn Discord
                </a>
              </Button>
            </div>
          ) : (
            <div className="text-center py-4">
              <MessageSquare className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                Forbind din Discord
              </h3>
              <p className="text-sm text-gray-400 mb-6">
                {hasAccess
                  ? "Forbind din Discord-konto for at få adgang til vores eksklusive community."
                  : "Køb et kursus for at få adgang til Discord-communityet."}
              </p>
              {hasAccess ? (
                <Button asChild>
                  <Link href="/api/discord/connect">
                    Forbind Discord
                  </Link>
                </Button>
              ) : (
                <Button asChild>
                  <Link href="/#pris">Køb adgang</Link>
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
