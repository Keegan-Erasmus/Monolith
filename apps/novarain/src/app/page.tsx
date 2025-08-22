import type { Metadata } from "next";
import { Gothic_A1 } from "next/font/google";
import "@ui/styles/bootstrap/standard.scss";
import Image from "next/image";

// Fonts
const gothic = Gothic_A1({
  subsets: ["latin"],
  weight: ["400"], 
});

// Metadata for SEO + social sharing
export const metadata: Metadata = {
  title: "NovaRain",
  description: "The future has already begun.",
  openGraph: {
    title: "NovaRain",
    description: "The future has already begun.",
    url: "https://novarain.co.za", 
    siteName: "NovaRain",
    images: [
      {
        url: "/novarain-white.png", 
        width: 1200,
        height: 630,
        alt: "NovaRain",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NovaRain",
    description: "The future has already begun.",
    images: ["/novarain-white-cropped.png"],
  },
  icons: {
    icon: "/supernova.png",
  },
};

export default function Home() {
  return (
    <main className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-black text-white text-center px-3">
      {/* Logo */}
      <Image
        src="/novarain-white-cropped.png"
        alt="NovaRain Logo"
        width="750"
        height="250"
        priority
        className="mb-4"
      />

      {/* Headline */}
      <h2 className="display-4 fw-bold mb-3">
         The future has already begun.
      </h2>

      {/* Subtext */}
      <p className="lead text-white mb-4" style={{ maxWidth: "600px" }}>
        Are You Ready?
      </p>

      {/* CTA */}
      <a
        href="/about-us"
        className="btn btn-primary btn-lg px-4 py-2">
        See More
      </a>

      {/* Footer */}
      <footer className="mt-5 text-secondary small">
        © {new Date().getFullYear()} NovaRain. All rights reserved.
      </footer>
    </main>
  );
}