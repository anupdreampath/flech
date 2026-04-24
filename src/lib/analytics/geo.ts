import { UAParser } from "ua-parser-js";

type Geo = {
  country?: string;
  region?: string;
  city?: string;
  lat?: number;
  lon?: number;
};

export async function lookupIp(ip: string): Promise<Geo> {
  if (!ip || ip === "127.0.0.1" || ip === "::1" || ip.startsWith("192.168."))
    return {};
  try {
    // Free tier: 1k requests/day — sufficient for a corp site.
    const res = await fetch(`https://ipapi.co/${ip}/json/`, {
      next: { revalidate: 60 * 60 * 24 },
    });
    if (!res.ok) return {};
    const data = await res.json();
    return {
      country: data.country_name,
      region: data.region,
      city: data.city,
      lat: data.latitude,
      lon: data.longitude,
    };
  } catch {
    return {};
  }
}

export function parseUserAgent(ua: string) {
  const parser = new UAParser(ua);
  const r = parser.getResult();
  return {
    device_type: r.device.type || "desktop",
    device_vendor: r.device.vendor,
    device_model: r.device.model,
    browser: r.browser.name,
    browser_version: r.browser.version,
    os: r.os.name,
    os_version: r.os.version,
  };
}

export function getClientIp(req: Request): string {
  const h = (k: string) => req.headers.get(k) || "";
  const fwd = h("x-forwarded-for").split(",")[0].trim();
  return (
    fwd ||
    h("x-real-ip") ||
    h("cf-connecting-ip") ||
    h("x-vercel-forwarded-for") ||
    ""
  );
}
