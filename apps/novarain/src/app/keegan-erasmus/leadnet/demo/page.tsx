"use client";
import { useState } from "react";
import Image from "next/image";

export default function CollagePage() {
  const photos = [
    "/leadnet/user-home.png",
    "/leadnet/all-leads.png",
    "/leadnet/my-leads.png",
    "/leadnet/log-lead.png",
    "/leadnet/new-lead.png",
    "/leadnet/call-summary.png"
  ];

  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((current - 1 + photos.length) % photos.length);
  const next = () =>
    setCurrent((current + 1) % photos.length);

  return (
    <main className="bg-black min-vh-100 py-5 d-flex flex-column align-items-center">
      <div className="position-center text-center d-inline-block">
        <a href="/keegan-erasmus">back</a>
        <br></br>
        <Image
          src={photos[current]}
          alt={`Collage ${current}`}
          // let Next use the original dimensions
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "auto", height: "auto" }}
        />

        {/* Controls */}
        <button
          className="btn btn-dark position-absolute top-50 start-0 translate-middle-y"
          onClick={prev}
        >
          ‹
        </button>
        <button
          className="btn btn-dark position-absolute top-50 end-0 translate-middle-y"
          onClick={next}
        >
          ›
        </button>
      </div>
    </main>
  );
}
