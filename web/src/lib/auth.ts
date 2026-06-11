import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { prisma } from "./prisma";

// Lightweight HMAC-signed session cookie. Deliberately dependency-free;
// swap for Auth.js if SSO/OAuth is ever needed (see docs/development.md).

const COOKIE = "jm_admin";
const SECRET = process.env.AUTH_SECRET ?? "dev-secret";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export const sha256 = (s: string) => createHash("sha256").update(s).digest("hex");

function sign(payload: string) {
  return createHmac("sha256", SECRET).update(payload).digest("hex");
}

export async function login(email: string, password: string): Promise<boolean> {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user?.passwordHash || user.role !== "ADMIN") return false;

  const given = Buffer.from(sha256(password));
  const stored = Buffer.from(user.passwordHash);
  if (given.length !== stored.length || !timingSafeEqual(given, stored)) return false;

  const exp = Date.now() + MAX_AGE * 1000;
  const payload = `${user.id}.${exp}`;
  const value = `${payload}.${sign(payload)}`;
  (await cookies()).set(COOKIE, value, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: MAX_AGE,
    path: "/",
  });
  return true;
}

export async function logout() {
  (await cookies()).delete(COOKIE);
}

export async function getSessionUserId(): Promise<string | null> {
  const raw = (await cookies()).get(COOKIE)?.value;
  if (!raw) return null;
  const [id, exp, sig] = raw.split(".");
  if (!id || !exp || !sig) return null;
  if (sign(`${id}.${exp}`) !== sig) return null;
  if (Date.now() > Number(exp)) return null;
  return id;
}
