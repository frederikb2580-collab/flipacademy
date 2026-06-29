const DISCORD_API = "https://discord.com/api/v10";
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN!;
const GUILD_ID = process.env.DISCORD_GUILD_ID!;
const MEMBER_ROLE_ID = process.env.DISCORD_MEMBER_ROLE_ID!;

async function discordFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  return fetch(`${DISCORD_API}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bot ${BOT_TOKEN}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
}

export async function addUserToGuild(
  discordId: string,
  accessToken: string
): Promise<boolean> {
  const res = await discordFetch(`/guilds/${GUILD_ID}/members/${discordId}`, {
    method: "PUT",
    body: JSON.stringify({
      access_token: accessToken,
      roles: [MEMBER_ROLE_ID],
    }),
  });
  return res.ok || res.status === 204;
}

export async function assignRole(discordId: string): Promise<boolean> {
  const res = await discordFetch(
    `/guilds/${GUILD_ID}/members/${discordId}/roles/${MEMBER_ROLE_ID}`,
    { method: "PUT" }
  );
  return res.ok || res.status === 204;
}

export async function removeRole(discordId: string): Promise<boolean> {
  const res = await discordFetch(
    `/guilds/${GUILD_ID}/members/${discordId}/roles/${MEMBER_ROLE_ID}`,
    { method: "DELETE" }
  );
  return res.ok || res.status === 204;
}

export async function sendDM(
  discordId: string,
  message: string
): Promise<boolean> {
  const channelRes = await discordFetch("/users/@me/channels", {
    method: "POST",
    body: JSON.stringify({ recipient_id: discordId }),
  });

  if (!channelRes.ok) return false;

  const channel = await channelRes.json();

  const msgRes = await discordFetch(`/channels/${channel.id}/messages`, {
    method: "POST",
    body: JSON.stringify({ content: message }),
  });

  return msgRes.ok;
}
