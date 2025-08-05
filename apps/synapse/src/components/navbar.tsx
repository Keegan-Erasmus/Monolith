"use client";

import { useEffect } from "react";

export default function Navbar({ username }: { username: string }) {
  useEffect(() => {
    const clock = document.getElementById("clock");
    const updateClock = () => {
      const now = new Date();
      const timeString = now
        .toLocaleTimeString("en-GB", { hour12: false })
        .padStart(8, "0");
      if (clock) clock.textContent = timeString;
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const navbar = document.getElementById("navbar");
    const hideBtn = document.getElementById("hide-navbar");
    const showBtn = document.getElementById("show-navbar");

    if (hideBtn && showBtn && navbar) {
      hideBtn.addEventListener("click", () => {
        navbar.classList.add("navbar-hidden");
        showBtn.classList.remove("d-none");
      });

      showBtn.addEventListener("click", () => {
        navbar.classList.remove("navbar-hidden");
        showBtn.classList.add("d-none");
      });
    }
  }, []);

  return (
    <>
      <button
        id="show-navbar"
        className="btn btn-outline-primary position-fixed top-0 end-0 m-2 d-none py-2"
        style={{ zIndex: 1051 }}
      >
        Show
      </button>

      <nav
        id="navbar"
        className="navbar navbar-expand-md navbar-dark bg-light px-4 shadow-sm py-2 fixed-top"
      >
        <a className="navbar-brand d-flex align-items-center" href="/big_timer">
          <span id="clock" className="text-white"></span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav gap-3 fs-5 fw-medium">
            <li className="nav-item">
              <a className="nav-link text-white" href="/home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/concepts">Concepts</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/books">Books</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/palaces">Palaces</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/review">Review</a>
            </li>
          </ul>

          <div className="d-block d-md-none mt-3 text-center">
            <div className="text-white fw-semibold mb-2">{username}</div>
            <form action="/logout" method="POST" className="mb-0">
              <button type="submit" className="btn btn-outline-primary w-100">
                Logout
              </button>
            </form>
          </div>
        </div>

        <div className="d-none d-md-flex align-items-center ms-auto">
          <div className="me-3 text-white fw-semibold">{username}</div>
          <form action="/logout" method="POST" className="mb-0">
            <button type="submit" className="btn btn-outline-primary">
              Logout
            </button>
          </form>
        </div>

        <button id="hide-navbar" className="btn btn-outline-primary">Hide</button>
      </nav>

      <style jsx>{`
        body {
          padding-top: 70px;
        }
        #navbar {
          transition: transform 0.3s ease;
        }
        .navbar-hidden {
          transform: translateY(-100%);
        }
      `}</style>
    </>
  );
}
