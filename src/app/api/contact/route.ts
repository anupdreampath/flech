import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { getClientIp, lookupIp } from "@/lib/analytics/geo";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const {
    name,
    company,
    email,
    phone,
    product,
    industry,
    quantity,
    customSize,
    message,
    referrer,
    pageUrl,
    answers,
    formType,
  } = body;

  if (!email && !phone && !name) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const ip = getClientIp(req);
  const geo = await lookupIp(ip);
  const ua = req.headers.get("user-agent") || "";

  const sb = createServerClient();
  const { data, error } = await sb
    .from("form_submissions")
    .insert({
      form_type: formType || "contact",
      name,
      company,
      email,
      phone,
      product,
      industry,
      quantity,
      custom_size: customSize,
      message,
      answers: answers || {},
      ip,
      user_agent: ua,
      country: geo.country,
      city: geo.city,
      region: geo.region,
      referrer,
      page_url: pageUrl,
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, id: data.id });
}
