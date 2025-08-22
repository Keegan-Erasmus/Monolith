import { Gothic_A1 } from "next/font/google";
import "@ui/styles/bootstrap/standard.scss";
import Image from "next/image";
import type { Metadata } from "next";

// Fonts
const gothic = Gothic_A1({
  subsets: ["latin"],
  weight: ["400"], 
});

// Metadata for SEO + social sharing
export const metadata: Metadata = {
  title: "Keegan Erasmus",
  description: "The future has already begun.",
  metadataBase: new URL("http://novarain.co.za/"),
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
    locale: "en_ZA",
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

export default function Page() {
  return (
    <main className="bg-black text-white">
      {/*  Header */}
      <header className="d-flex justify-content-between align-items-center px-4 py-3 fixed-top bg-none" >
        <div className="d-flex align-items-center">
          <a href="/"><Image
            src="/novarain-white-cropped.png"
            alt="NovaRain Logo"
            width={150}
            height={50}
            priority
            className="rounded me-2"
          /></a>
        </div>
        <nav>
          <a href="https://www.linkedin.com/in/keegan-erasmus/" target="_blank" className="btn btn-outline-dark btn-sm me-2">Linked In</a>
          <a href="https://github.com/Keegan-Erasmus" target="_blank" className="btn btn-outline-dark btn-sm me-2">Github</a>
          <a href="#CV" className="btn btn-outline-dark btn-sm">CV</a>
        </nav>
      </header>

      {/* Hero Section */}  
      <section className="container py-5 justify-content-center">
        <section id="work" ></section>
        <h1 className="display-1 fw-bold mb-3">Keegan Erasmus</h1>
        <p className="lead mb-4">Most people don't know what they want to be, <b>I do:</b></p>
        <p className="lead mb-4"><b>&#60;Studying Enthusiast, Fullstack Developer, Lifelong Learner&#62;</b></p>
      </section>

      {/* Work Section */}
      <section id="work" className="container py-5">
        <h2 className="h2 mb-4">Work</h2>
        <div className="row g-4">
          <div className="col-md-6 col-lg-4">
            <div className="card bg-light text-white shadow-sm h-100">
              <div className="card-body">
                <h5 className="h5">NovaRain</h5>
                <p className="text-muted">Freelancing</p>
                <p className="text-muted">Over the course of 2 weeks created <a href="keegan-erasmus/leadnet" className="">LeadNet</a> a webapp that scrapes the web for leads and aggregates them in one place where users can call and manage leads. Created for Rawson Auctions.</p>
                <a href="/pt-scales" className="">Read More</a>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="card bg-light text-white shadow-sm h-100">
              <div className="card-body">
                <h5 className="h5">LiquidEdge</h5>
                <p className="text-muted">Project Planning / DBA / Documentation / UI Engineer</p>
                <p className="text-muted">In the span of 6 months Scoped, planned and built and entire sales order to invoice system with integration into OMNI Accounts for 2 large clients.</p>
                <a href="/pt-scales" className="">Read More</a>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="card bg-light text-white shadow-sm h-100">
              <div className="card-body">
                <h5 className="h5">AT Consulting as LiquidEdge</h5>
                <p className="text-muted">Team Lead / DBA / Client Liason</p>
                <p className="text-muted">Went from new guy to team lead in 8 months. Built 6 large projects for notable clients managed a small team of 5</p>
                <a href="/pt-scales" className="">Read More</a>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="card bg-light text-white shadow-sm h-100">
              <div className="card-body">
                <h3 className="h5">PT Scales</h3>
                <p className="text-muted">Role / Description</p>
                <p className="text-muted">I worked at PT Scales as a Field Service Technitian where i built and maintained industrial packaging machines.</p>
                <a href="/pt-scales" className="">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Study Section */}
      <section id="study" className="container py-5">
        <h2 className="h2 mb-4">Study</h2>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card bg-light text-white shadow-sm h-100 p-3">
              <h5 className="h5">University Name</h5>
              <p className="text-muted">Degree | Period</p>
              <ul className="list-unstyled mt-2">
                <li>Specialization / Honors</li>
                <li>Project Grade / Notes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="container py-5">
        <h2 className="h2 mb-4">Projects</h2>
        <div className="row g-4">
          <div className="col-md-6 col-lg-4">
            <div className="card bg-light text-white shadow-sm h-100">
              <img src="/path/to/project-screenshot.png" className="card-img-top" alt="Project" />
              <div className="card-body">
                <h5 className="h5">Project Name</h5>
                <p className="text-muted">Short description or tech stack</p>
              </div>
            </div>
          </div>
          {/* More project cards */}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-4 text-secondary small">
        © {new Date().getFullYear()} NovaRain. All rights reserved.
      </footer>
    </main>
  );
}
