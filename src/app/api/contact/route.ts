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
  const isCompleteLead = Boolean(
    name && company && email && product && industry && quantity
  );
  const { data, error } = await sb
    .from("form_submissions")
    .insert({
      form_type: formType || "quote",
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
      is_complete: isCompleteLead,
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  if (isCompleteLead) {
    notifyCompletedLead(data.id).catch((notifyError) => {
      console.error("Lead email notification failed", notifyError);
    });
  }

  return NextResponse.json({ ok: true, id: data.id });
}

async function notifyCompletedLead(submissionId: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return;

  const res = await fetch(`${url}/functions/v1/send-lead-email`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${serviceKey}`,
    },
    body: JSON.stringify({ submissionId }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`send-lead-email failed: ${res.status} ${text}`);
  }
}
