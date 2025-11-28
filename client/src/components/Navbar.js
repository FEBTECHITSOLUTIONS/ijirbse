"use client";
import Link from "next/link";
import Dropdown from "./Dropdown";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const aboutItems = [
    { name: "Aims & Scope", link: "/about/aims" },
    { name: "Editorial Board", link: "/about/editorial-board" },
    { name: "Journal Indexing & Insight", link: "/about/indexing" },
  ];

  const publishItems = [
    { name: "Guide for Authors", link: "/publish/guide-for-authors" },
    { name: "Submit Your Research Article", link: "/publish/submit-article" },
  ];

  const articlesItems = [
    { name: "Latest Issues", link: "/articles/latest-issues" },
    { name: "Archives", link: "/articles/archives" },
  ];

  return (
    <div className="sticky top-5  max-w-7xl flex justify-center items-center z-50 ">
      <nav className="backdrop-blur-xl bg-[#245696]/10  shadow-md w-[90vw]  rounded-full">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-1">
          {/* Brand / Logo */}
          <Link
            href="/"
            className=" font-bold bg-white transition px-3 py-2 rounded-full  -translate-x-2.5"
          >
            <img src="/journal logo.svg" className=" scale-150" alt="" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 font-medium text-black">
            <Dropdown title="About the Journal" items={aboutItems} />
            <Dropdown title="Publish" items={publishItems} />
            <Dropdown title="Articles & Issues" items={articlesItems} />
            <Link
              href="/publish/submit-article"
              className=" hover:scale-105 transition-transform duration-100 ease-linear transform"
            >
              Submit Article
            </Link>
            <Link
              href="/contact"
              className=" hover:scale-105 transition-transform duration-100 ease-linear transform"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl text-gray-900 hover:text-[#001BB7] transition"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

     
      </nav>
         {/* Mobile Dropdown Menu */}
        <div
          className={`${
            menuOpen ? "-translate-x-5" : "translate-x-[60vw]"
          } md:hidden fixed top-20 right-0 w-[60vw]  bg-linear-to-br from-[#0782df] to-[#0b111d] rounded-2xl  transition-transform duration-300 ease-in-out transform`}
        >
          <div className="flex flex-col space-y-4 py-6 px-4  rounded-2xl z-50 h-full backdrop-blur-3xl text-black">
            <Dropdown title="About the Journal" items={aboutItems} />
            <Dropdown title="Publish" items={publishItems} />
            <Dropdown title="Articles & Issues" items={articlesItems} />

            <Link
              href="/publish/submit-article"
              onClick={() => setMenuOpen(false)}
            >
              Submit Article
            </Link>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
    </div>
  );
}
