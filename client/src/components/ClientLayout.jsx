"use client";

import useLenis from "@/lib/useLenis";
import Navbar from "@/components/Navbar";

export default function ClientLayout({ children }) {
  useLenis(); // initialize Lenis smooth scrolling

  return (
    <>
      <main className=" overflow-hidden">
        {children}
      </main>
    </>
  );
}
