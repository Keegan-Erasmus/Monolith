import type { Metadata } from "next";
import "@ui/styles/bootstrap/standard.scss";
import Navbar from "@components/navbar";

export const metadata: Metadata = {
  title: "Synapse",
  description: "Where memory begins",
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
        <main className="flex-grow-1 container mt-4">{children}</main>
      </body>
    </html>
  );
}
