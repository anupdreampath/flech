import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE = "flech_admin_session";
const secret = () =>
  new TextEncoder().encode(process.env.ADMIN_SESSION_SECRET || "dev-secret");

export async function createSession(payload: {
  userId: string;
  email: string;
}) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());

  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function getSession() {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload as { userId: string; email: string };
  } catch {
    return null;
  }
}

export async function readSessionFromCookie(cookieValue: string | undefined) {
  if (!cookieValue) return null;
  try {
    const { payload } = await jwtVerify(cookieValue, secret());
    return payload as { userId: string; email: string };
  } catch {
    return null;
  }
}

export const ADMIN_COOKIE = COOKIE;
