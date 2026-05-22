// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://groovybuilds.com";
const siteName = "Groovy Builds";
const siteDescription =
  "Groovy Builds is an East Nashville-based design-build construction and remodeling company specializing in bathroom remodels, shower remodels, custom tiled showers, kitchens, additions, and custom residential spaces.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: "Groovy Builds | East Nashville Bathroom Remodels + Custom Tiled Showers",
    template: "%s | Groovy Builds",
  },
  description: siteDescription,
  keywords: [
    "Groovy Builds",
    "design build",
    "design-build construction",
    "home remodeling",
    "kitchen remodeling",
    "bathroom remodeling",
    "bathroom remodels",
    "bathroom renovation",
    "shower remodel",
    "shower remodels",
    "custom shower remodel",
    "custom tiled showers",
    "custom tile showers",
    "tile shower installation",
    "walk-in shower remodel",
    "tile work",
    "tile installation",
    "tile contractor",
    "home additions",
    "custom remodeling",
    "Nashville remodeler",
    "Nashville bathroom remodel",
    "Nashville shower remodel",
    "Nashville tile shower",
    "East Nashville remodeler",
    "East Nashville construction",
    "East Nashville bathroom remodel",
    "East Nashville shower remodel",
    "East Nashville tile",
    "East Nashville tile shower",
    "East Nashville remodeling",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: "Groovy Builds | East Nashville Bathroom Remodels + Custom Tiled Showers",
    description: siteDescription,
    images: [
      {
        url: "/brand/watermark.png",
        width: 1304,
        height: 639,
        alt: "Groovy Builds",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Groovy Builds | East Nashville Bathroom Remodels + Custom Tiled Showers",
    description: siteDescription,
    images: ["/brand/watermark.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "construction",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: siteName,
    url: siteUrl,
    email: "info@groovybuilds.com",
    logo: `${siteUrl}/brand/watermark.png`,
    image: `${siteUrl}/portfolio/1.jpg`,
    description: siteDescription,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nashville",
      addressRegion: "TN",
      addressCountry: "US",
    },
    areaServed: [
      {
        "@type": "Place",
        name: "East Nashville",
      },
      {
        "@type": "City",
        name: "Nashville",
        addressRegion: "TN",
        addressCountry: "US",
      },
      {
        "@type": "AdministrativeArea",
        name: "Middle Tennessee",
      },
    ],
    sameAs: ["https://instagram.com/groovybuilds"],
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Design-build construction",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Kitchen remodeling",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Bathroom remodels",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Shower remodels",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom tiled showers",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Tile work",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Home additions",
        },
      },
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Monoton&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
