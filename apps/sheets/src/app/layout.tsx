import type { Metadata } from "next";
import "@ui/styles/bootstrap/standard.scss";
import Navbar from "@components/navbar";

export const metadata: Metadata = {
  title: "Sheets",
  description: "Better than Excel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="d-flex flex-column min-vh-100" data-bs-theme="brite">
        <Navbar username="test" />
        <main className="flex-grow-1 container-fluid mt-4">{children}</main>
      </body>
    </html>
  );
}
