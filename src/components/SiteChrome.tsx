"use client";

import { usePathname } from "next/navigation";
import { Navbar, type NavbarProps } from "@/components/Navbar";
import { Footer, type FooterProps } from "@/components/Footer";

export type SiteChromeProps = {
  navbar: NavbarProps;
  footer: FooterProps;
  children: React.ReactNode;
};

export function SiteChrome({ navbar, footer, children }: SiteChromeProps) {
  const pathname = usePathname() || "/";
  const hideChrome = pathname.startsWith("/admin");

  if (hideChrome) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <Navbar {...navbar} />
      <main className="flex-1">{children}</main>
      <Footer {...footer} />
    </>
  );
}
