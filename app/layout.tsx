// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://groovybuilds.com";
const siteName = "Groovy Builds";
const siteDescription =
  "Groovy Builds is a design-build construction and remodeling company creating thoughtful kitchens, bathrooms, additions, and custom residential spaces.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: "Groovy Builds | Design-Build Construction + Remodeling",
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
    "home additions",
    "custom remodeling",
    "Nashville remodeler",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: "Groovy Builds | Design-Build Construction + Remodeling",
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
    title: "Groovy Builds | Design-Build Construction + Remodeling",
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
    areaServed: ["Nashville, TN", "Middle Tennessee"],
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
          name: "Bathroom remodeling",
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
