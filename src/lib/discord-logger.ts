type LogColor = "green" | "red" | "blue" | "yellow" | "purple";

const colorMap: Record<LogColor, number> = {
  green: 0x22c55e,
  red: 0xef4444,
  blue: 0x3b82f6,
  yellow: 0xeab308,
  purple: 0x7c3aed,
};

interface LogField {
  name: string;
  value: string;
  inline?: boolean;
}

async function sendToWebhook(
  webhookUrl: string | undefined,
  {
    title,
    description,
    color = "blue",
    fields = [],
  }: {
    title: string;
    description?: string;
    color?: LogColor;
    fields?: LogField[];
  }
) {
  if (!webhookUrl) return;

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title,
            description,
            color: colorMap[color],
            fields: fields.map((f) => ({
              name: f.name,
              value: f.value,
              inline: f.inline ?? true,
            })),
            timestamp: new Date().toISOString(),
            footer: { text: "FlipAcademy" },
          },
        ],
      }),
    });
  } catch {
    console.error("Discord log failed");
  }
}

export async function logPurchase(
  email: string,
  name: string,
  amount: number,
  courseTitle: string,
  couponCode?: string
) {
  await sendToWebhook(process.env.DISCORD_WEBHOOK_PURCHASE, {
    title: "Nyt køb!",
    description: `**${name}** har købt kurset`,
    color: "green",
    fields: [
      { name: "Email", value: email },
      { name: "Kursus", value: courseTitle },
      { name: "Beløb", value: `${amount} DKK` },
      ...(couponCode ? [{ name: "Rabatkode", value: couponCode }] : []),
    ],
  });
}

export async function logRefund(email: string, amount: number, orderId: string) {
  await sendToWebhook(process.env.DISCORD_WEBHOOK_REFUND, {
    title: "Refundering",
    description: `En ordre er blevet refunderet`,
    color: "red",
    fields: [
      { name: "Email", value: email },
      { name: "Beløb", value: `${amount} DKK` },
      { name: "Ordre ID", value: orderId },
    ],
  });
}

export async function logNewUser(email: string, name: string) {
  await sendToWebhook(process.env.DISCORD_WEBHOOK_NEW_USER, {
    title: "Ny bruger",
    description: `**${name}** har oprettet en konto`,
    color: "blue",
    fields: [
      { name: "Email", value: email },
      { name: "Navn", value: name },
    ],
  });
}

export async function logDiscordConnect(
  email: string,
  discordUsername: string
) {
  await sendToWebhook(process.env.DISCORD_WEBHOOK_DISCORD_CONNECT, {
    title: "Discord forbundet",
    description: `En bruger har forbundet sin Discord`,
    color: "purple",
    fields: [
      { name: "Email", value: email },
      { name: "Discord", value: discordUsername },
    ],
  });
}

export async function logError(action: string, error: string) {
  await sendToWebhook(process.env.DISCORD_WEBHOOK_ERROR, {
    title: "Fejl",
    description: `Fejl i **${action}**`,
    color: "red",
    fields: [{ name: "Detaljer", value: error, inline: false }],
  });
}
