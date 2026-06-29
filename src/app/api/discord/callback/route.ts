import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { addUserToGuild } from "@/lib/discord";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const userId = url.searchParams.get("state");
  const baseUrl = process.env.NEXTAUTH_URL!;

  if (!code || !userId) {
    return NextResponse.redirect(`${baseUrl}/dashboard/discord?error=missing_params`);
  }

  try {
    const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID!,
        client_secret: process.env.DISCORD_CLIENT_SECRET!,
        grant_type: "authorization_code",
        code,
        redirect_uri: `${baseUrl}/api/discord/callback`,
      }),
    });

    if (!tokenRes.ok) {
      return NextResponse.redirect(`${baseUrl}/dashboard/discord?error=token_failed`);
    }

    const tokens = await tokenRes.json();

    const userRes = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });

    if (!userRes.ok) {
      return NextResponse.redirect(`${baseUrl}/dashboard/discord?error=user_failed`);
    }

    const discordUserData = await userRes.json();

    const hasAccess = await db.order.findFirst({
      where: { userId, status: "COMPLETED" },
    });

    let guildJoined = false;
    let roleAssigned = false;

    if (hasAccess) {
      guildJoined = await addUserToGuild(
        discordUserData.id,
        tokens.access_token
      );
      roleAssigned = guildJoined;
    }

    await db.discordUser.upsert({
      where: { userId },
      create: {
        userId,
        discordId: discordUserData.id,
        discordUsername: discordUserData.username,
        discordAvatar: discordUserData.avatar,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        guildJoined,
        roleAssigned,
      },
      update: {
        discordId: discordUserData.id,
        discordUsername: discordUserData.username,
        discordAvatar: discordUserData.avatar,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        guildJoined,
        roleAssigned,
      },
    });

    return NextResponse.redirect(`${baseUrl}/dashboard/discord?success=true`);
  } catch (error) {
    console.error("Discord callback error:", error);
    return NextResponse.redirect(`${baseUrl}/dashboard/discord?error=unknown`);
  }
}
