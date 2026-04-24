import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { getClientIp, lookupIp, parseUserAgent } from "@/lib/analytics/geo";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const {
    session_token,
    visitor_id,
    event_type = "pageview",
    page_url,
    page_title,
    referrer,
    duration_seconds,
    utm_source,
    utm_medium,
    utm_campaign,
    meta,
  } = body;

  if (!session_token) {
    return NextResponse.json({ ok: false, error: "missing token" }, { status: 400 });
  }

  const sb = createServerClient();
  const ua = req.headers.get("user-agent") || "";
  const ip = getClientIp(req);

  if (event_type === "session_start") {
    const geo = await lookupIp(ip);
    const uaData = parseUserAgent(ua);
    await sb.from("analytics_sessions").upsert(
      {
        session_token,
        visitor_id,
        ip,
        user_agent: ua,
        landing_page: page_url,
        referrer,
        utm_source,
        utm_medium,
        utm_campaign,
        ...geo,
        ...uaData,
        started_at: new Date().toISOString(),
        last_seen_at: new Date().toISOString(),
      },
      { onConflict: "session_token" }
    );
  } else {
    // heartbeat / pageview / custom — update session, insert event
    await sb
      .from("analytics_sessions")
      .update({
        last_seen_at: new Date().toISOString(),
        ...(typeof duration_seconds === "number"
          ? { duration_seconds }
          : {}),
        ...(event_type === "pageview"
          ? {}
          : {}),
      })
      .eq("session_token", session_token);

  }

  await sb.from("analytics_events").insert({
    session_token,
    event_type,
    page_url,
    page_title,
    referrer,
    meta: meta || {},
  });

  if (event_type === "pageview") {
    // bump page_views counter in session row
    const { data } = await sb
      .from("analytics_sessions")
      .select("page_views")
      .eq("session_token", session_token)
      .maybeSingle();
    if (data) {
      await sb
        .from("analytics_sessions")
        .update({ page_views: (data.page_views || 0) + 1 })
        .eq("session_token", session_token);
    }
  }

  return NextResponse.json({ ok: true });
}
