import type { Metadata } from "next";
import { Gothic_A1 } from "next/font/google";
import "@ui/styles/bootstrap/standard.scss";
import Image from "next/image";
import dbPool from "@db/client";

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
    images: ["/novarain-white.png"],
  },
  icons: {
    icon: "/supernova.png",
  },
};

export default async function LeadNetPage() {
  const [rows] = await dbPool.execute(`
    SELECT
      (SELECT COUNT(*) FROM raw_leads) AS leads,
      (SELECT COUNT(*) FROM raw_calls) AS calls,
      (SELECT COUNT(*) FROM raw_user WHERE usr_is_active = 1) AS users
  `);
  const stats = Array.isArray(rows) && rows.length > 0 ? (rows[0] as any) : { leads: 0, calls: 0, users: 0 };

  return (
    <main className="bg-black min-vh-100 d-flex flex-column justify-content-center text-white">
      <div className="container py-5">
        <div className="row justify-content-center align-items-center gx-5">

          {/* Stats Card */}
          <div className="col-12 col-md-5 mb-4 mb-md-0">
            <div className="card shadow-lg bg-light border-0">
              <div className="card-body p-5 text-center">
                <h1 className="display-3 fw-bold mb-4">LeadNet</h1>
                <p className="lead mb-5">
                  The ultimate lead sourcing platform for Rawson Auctions.
                  <br />
                  Save time, increase productivity, and manage your leads in one place.
                </p>

                {/* Stats */}
                <div className="row text-center mb-4">
                  <div className="col">
                    <h2 className="fw-bold">{stats.users}</h2>
                    <p className="text-muted">Active Users</p>
                  </div>
                  <div className="col">
                    <h2 className="fw-bold">{stats.leads}</h2>
                    <p className="text-muted">Leads Generated</p>
                  </div>
                  <div className="col">
                    <h2 className="fw-bold">{stats.calls}</h2>
                    <p className="text-muted">Calls Made</p>
                  </div>
                </div>

                <h4 className="mb-4">
                  Time Saved: <span className="fw-bold">{Math.round(stats.leads / 20)} Hrs</span>
                </h4>

                <a href="/keegan-erasmus/leadnet/demo" className="btn btn-lg btn-primary px-5 py-3">
                  View Example Screens
                </a>
              </div>
            </div>
          </div>

          {/* Logo */}
          <div className="col-12 col-md-4 text-center">
            <Image
              src="/leadnet/rawson_logo.png"
              alt="Rawson Logo"
              width={300}
              height={150}
              className="img-fluid mb-4"
              priority
            />
          </div>

        </div>
      </div>
    </main>
  );
}

