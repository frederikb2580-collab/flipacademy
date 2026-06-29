import { NextRequest, NextResponse } from "next/server";

const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN!;
const GUILD_ID = process.env.DISCORD_GUILD_ID!;
const API = "https://discord.com/api/v10";
const ADMIN_ROLE_ID = "1521260401772204064";
const EJER_ROLE_ID = "1521261736106393692";
const TICKET_ROLE_ID = "1521262658639368313";
const TICKET_LOG_WEBHOOK = "https://discord.com/api/webhooks/1521262669682708572/jDntTc6ZzwDVyVsrpXAUBhkqnqypWnGvZs7muA3QDMI36f0eRT1jbDubfFwlRQNswn9a";

const TICKET_CATEGORIES: Record<string, { label: string; emoji: string }> = {
  ticket_purchase: { label: "Køb & Betaling", emoji: "🛒" },
  ticket_course: { label: "Kursus", emoji: "📚" },
  ticket_discord: { label: "Discord", emoji: "💬" },
  ticket_tech: { label: "Teknisk", emoji: "🔧" },
  ticket_refund: { label: "Refundering", emoji: "💰" },
  ticket_other: { label: "Andet", emoji: "❓" },
};

async function discordApi(endpoint: string, method = "GET", body?: unknown) {
  const res = await fetch(`${API}${endpoint}`, {
    method,
    headers: {
      Authorization: `Bot ${BOT_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (res.status === 204) return {};
  return res.json();
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body.type === 1) {
    return NextResponse.json({ type: 1 });
  }

  if (body.type === 3) {
    const customId = body.data.custom_id as string;
    const user = body.member?.user ?? body.user;

    if (customId.startsWith("ticket_")) {
      const category = TICKET_CATEGORIES[customId];
      if (!category) return NextResponse.json({ type: 4, data: { content: "Ukendt kategori", flags: 64 } });

      const channelName = `ticket-${user.username}-${Date.now().toString(36)}`;

      const parentChannels = await discordApi(`/guilds/${GUILD_ID}/channels`);
      const ticketCategory = parentChannels.find(
        (c: { name: string; type: number }) => c.name === "🎫 TICKET SYSTEM" && c.type === 4
      );

      const channel = await discordApi(`/guilds/${GUILD_ID}/channels`, "POST", {
        name: channelName,
        type: 0,
        parent_id: ticketCategory?.id,
        topic: `${category.emoji} ${category.label} — Oprettet af ${user.username}`,
        permission_overwrites: [
          { id: GUILD_ID, type: 0, deny: "1024" },
          { id: user.id, type: 1, allow: "3072" },
          { id: ADMIN_ROLE_ID, type: 0, allow: "3072" },
          { id: EJER_ROLE_ID, type: 0, allow: "3072" },
          { id: TICKET_ROLE_ID, type: 0, allow: "3072" },
        ],
      });

      await discordApi(`/channels/${channel.id}/messages`, "POST", {
        embeds: [
          {
            title: `${category.emoji} ${category.label}`,
            description: `Hej <@${user.id}>!\n\nTak fordi du oprettede en ticket. En fra teamet vil svare dig hurtigst muligt.\n\nBeskriv venligst dit problem eller spørgsmål herunder.`,
            color: 0x7c3aed,
            fields: [
              { name: "Kategori", value: category.label, inline: true },
              { name: "Oprettet af", value: `<@${user.id}>`, inline: true },
            ],
            footer: { text: "FlipAcademy Support" },
            timestamp: new Date().toISOString(),
          },
        ],
        components: [
          {
            type: 1,
            components: [
              {
                type: 2,
                style: 4,
                label: "Luk ticket",
                custom_id: `close_ticket_${channel.id}`,
                emoji: { name: "🔒" },
              },
            ],
          },
        ],
      });

      await fetch(TICKET_LOG_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              title: "🎫 Ny ticket oprettet",
              color: 0x7c3aed,
              fields: [
                { name: "Bruger", value: `${user.username} (<@${user.id}>)`, inline: true },
                { name: "Kategori", value: `${category.emoji} ${category.label}`, inline: true },
                { name: "Kanal", value: `<#${channel.id}>`, inline: true },
              ],
              timestamp: new Date().toISOString(),
              footer: { text: "FlipAcademy Tickets" },
            },
          ],
        }),
      });

      return NextResponse.json({
        type: 4,
        data: {
          content: `Din ticket er oprettet! Gå til <#${channel.id}>`,
          flags: 64,
        },
      });
    }

    if (customId.startsWith("close_ticket_")) {
      const channelId = customId.replace("close_ticket_", "");

      await discordApi(`/channels/${channelId}/messages`, "POST", {
        embeds: [
          {
            title: "🔒 Ticket lukket",
            description: `Lukket af <@${user.id}>. Denne kanal slettes om 10 sekunder.`,
            color: 0xef4444,
            timestamp: new Date().toISOString(),
          },
        ],
      });

      await fetch(TICKET_LOG_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              title: "🔒 Ticket lukket",
              color: 0xef4444,
              fields: [
                { name: "Lukket af", value: user.username, inline: true },
                { name: "Kanal", value: channelId, inline: true },
              ],
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });

      setTimeout(async () => {
        await discordApi(`/channels/${channelId}`, "DELETE");
      }, 10000);

      return NextResponse.json({
        type: 4,
        data: { content: "Ticket lukkes om 10 sekunder...", flags: 64 },
      });
    }
  }

  return NextResponse.json({ type: 1 });
}
