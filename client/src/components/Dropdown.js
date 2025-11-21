"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

export default function Dropdown({ title, items }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 🧠 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1 text-black hover:scale-105 transition-transform duration-100 ease-linear transform  focus:outline-none"
      >
        {title}
        <FiChevronDown
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {open && (
        <div className="absolute mt-2 bg-white shadow-lg rounded-2xl border border-gray-100 w-52 z-50">
          {items.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              onClick={() => setOpen(false)} // ✅ Close dropdown on selection
              className="block px-4 py-2 text-black hover:text-white hover:bg-blue-500 rounded-2xl"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
