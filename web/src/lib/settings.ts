import { prisma } from "./prisma";

export async function getSetting<T = string>(key: string, fallback: T): Promise<T> {
  const row = await prisma.setting.findUnique({ where: { key } });
  if (!row) return fallback;
  try {
    return JSON.parse(row.value) as T;
  } catch {
    return fallback;
  }
}

export async function setSetting(key: string, value: unknown) {
  const json = JSON.stringify(value);
  await prisma.setting.upsert({
    where: { key },
    update: { value: json },
    create: { key, value: json },
  });
}

export async function getContactSettings() {
  const [email, whatsapp, wechatQr, calendly] = await Promise.all([
    getSetting("contact.email", "hello@jimeng.network"),
    getSetting("contact.whatsapp", ""),
    getSetting("contact.wechat_qr_url", ""),
    getSetting("contact.calendly_url", ""),
  ]);
  return { email, whatsapp, wechatQr, calendly };
}
