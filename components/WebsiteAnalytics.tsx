"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
export default function WebsiteAnalytics() {
  const pathname = usePathname();
  const configured = useRef(false);
  const lastPath = useRef("");
  useEffect(() => {
    const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    if (
      !id ||
      !/^G-[A-Z0-9]+$/.test(id) ||
      pathname.startsWith("/admin") ||
      !window.gtag
    )
      return;
    if (!configured.current) {
      window.gtag("config", id, { send_page_view: false });
      configured.current = true;
    }
    const location = new URL(pathname, window.location.origin);
    const search = new URLSearchParams(window.location.search);
    for (const key of [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
      "gclid",
      "gbraid",
      "wbraid",
    ]) {
      const value = search.get(key);
      if (value) location.searchParams.set(key, value.slice(0, 256));
    }
    const event = (name: string) =>
      window.gtag?.("event", name, {
        send_to: id,
        page_location: location.href,
      });
    if (lastPath.current !== pathname) {
      event("page_view");
      lastPath.current = pathname;
    }
    const click = (e: MouseEvent) => {
      const a = (e.target as Element)?.closest?.("a");
      if (a?.getAttribute("href")?.startsWith("tel:")) event("phone_click");
      if (a?.getAttribute("href")?.startsWith("mailto:")) event("email_click");
    };
    let started = false;
    const formStart = (e: Event) => {
      if (
        !started &&
        (e.target as Element)?.closest?.('[data-jobtread-web-form="true"]')
      ) {
        started = true;
        event("contact_form_start");
      }
    };
    document.addEventListener("click", click);
    document.addEventListener("input", formStart);
    document.addEventListener("change", formStart);
    return () => {
      document.removeEventListener("click", click);
      document.removeEventListener("input", formStart);
      document.removeEventListener("change", formStart);
    };
  }, [pathname]);
  return null;
}
