"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function uuid() {
  return (
    crypto.randomUUID?.() ||
    "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    })
  );
}

function getVisitorId() {
  if (typeof localStorage === "undefined") return uuid();
  let id = localStorage.getItem("flech_vid");
  if (!id) {
    id = uuid();
    localStorage.setItem("flech_vid", id);
  }
  return id;
}

function getSessionToken() {
  if (typeof sessionStorage === "undefined") return uuid();
  let t = sessionStorage.getItem("flech_sid");
  if (!t) {
    t = uuid();
    sessionStorage.setItem("flech_sid", t);
    sessionStorage.setItem("flech_sid_start", String(Date.now()));
  }
  return t;
}

async function post(body: Record<string, unknown>) {
  try {
    await fetch("/api/analytics/track", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      keepalive: true,
    });
  } catch {}
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const started = useRef(false);

  useEffect(() => {
    const sid = getSessionToken();
    const vid = getVisitorId();
    const isNew = !sessionStorage.getItem("flech_sid_sent");

    if (isNew && !started.current) {
      started.current = true;
      sessionStorage.setItem("flech_sid_sent", "1");
      const params = new URLSearchParams(window.location.search);
      post({
        session_token: sid,
        visitor_id: vid,
        event_type: "session_start",
        page_url: window.location.href,
        page_title: document.title,
        referrer: document.referrer,
        utm_source: params.get("utm_source"),
        utm_medium: params.get("utm_medium"),
        utm_campaign: params.get("utm_campaign"),
      });
    }

    // pageview on every route change
    post({
      session_token: sid,
      visitor_id: vid,
      event_type: "pageview",
      page_url: window.location.href,
      page_title: document.title,
      referrer: document.referrer,
    });
  }, [pathname]);

  useEffect(() => {
    const sid = getSessionToken();
    const tick = () => {
      const start = Number(sessionStorage.getItem("flech_sid_start") || Date.now());
      const secs = Math.floor((Date.now() - start) / 1000);
      post({
        session_token: sid,
        event_type: "heartbeat",
        duration_seconds: secs,
        page_url: window.location.href,
      });
    };
    const iv = window.setInterval(tick, 15_000);
    const onHide = () => {
      if (document.visibilityState === "hidden") tick();
    };
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("beforeunload", tick);
    return () => {
      window.clearInterval(iv);
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("beforeunload", tick);
    };
  }, []);

  return null;
}
