import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import Redis from "ioredis";

const VISITOR_COOKIE = "grs_uid";
const UNIQUE_KEY = "visitors:unique";
const TOTAL_KEY = "visitors:total";

let redisClient: Redis | null = null;

function getRedis(): Redis | null {
  if (redisClient) return redisClient;

  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL ?? process.env.STORAGE_REDIS_URL;
  if (!url) return null;

  const client = new Redis(url);
  client.on("error", (err) => console.error("[Redis error]", err));
  redisClient = client;
  return client;
}

export async function GET() {
  const redis = getRedis();
  if (!redis) {
    return NextResponse.json({ unique: null, total: null }, { status: 200 });
  }

  try {
    const cookieStore = await cookies();
    const hasVisited = cookieStore.has(VISITOR_COOKIE);

    const total = await redis.incr(TOTAL_KEY);
    const unique = hasVisited
      ? ((await redis.get(UNIQUE_KEY)) ? parseInt(await redis.get(UNIQUE_KEY) as string) : 0)
      : await redis.incr(UNIQUE_KEY);

    const response = NextResponse.json({ unique, total });

    if (!hasVisited) {
      response.cookies.set(VISITOR_COOKIE, crypto.randomUUID(), {
        maxAge: 60 * 60 * 24 * 365,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
    }

    return response;
  } catch (error) {
    console.error("[visitors API error]", error instanceof Error ? error.message : String(error));
    return NextResponse.json({ unique: null, total: null }, { status: 200 });
  }
}
