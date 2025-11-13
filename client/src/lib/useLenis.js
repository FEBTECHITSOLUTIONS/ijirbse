"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export default function useLenis() {
  useEffect(() => {
    if (window.innerWidth > 1024) {
      // initialize Lenis
      const lenis = new Lenis({
        lerp: 0.1,     // smoothness
        smooth: true,  // enable smooth scroll
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      // cleanup on unmount
      return () => lenis.destroy();
    }
  }, []);
}
