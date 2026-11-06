"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
export default function WebsiteAnalytics() {
  const pathname = usePathname();
  useEffect(() => {
    const id = "G-Z4LMLHVXL2";
    if (pathname.startsWith("/admin") || !window.gtag) return;
    // The shared Google tag handles page views, including history navigation.
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
