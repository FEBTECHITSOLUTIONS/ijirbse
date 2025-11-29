"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, User, Building2 } from "lucide-react";

export default function EditorialBoard() {
  const [editors, setEditors] = useState([]);
  const [filteredEditors, setFilteredEditors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;
  console.log(BASE_URL);
  
  useEffect(() => {
    const fetchEditors = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getalluser`);
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        const data = json?.data || [];

        setEditors(data);
        setFilteredEditors(data);
      } catch (err) {
        console.error("Error fetching editors:", err);
        setError("Failed to load editorial board. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEditors();
  }, []);

  // Filtering logic
  useEffect(() => {
    let result = editors;

    if (selectedFilter !== "all") {
      result = result.filter((editor) => {
        const subRole = editor.subRole?.toLowerCase() || "";
        if (selectedFilter === "chief") return subRole.includes("chief");
        if (selectedFilter === "associate")
          return subRole.includes("associate") && !subRole.includes("chief");
        if (selectedFilter === "member")
          return !subRole.includes("chief") && !subRole.includes("associate");
        return true;
      });
    }

    if (searchQuery) {
      result = result.filter(
        (editor) =>
          editor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          editor.subRole?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          editor.backGround?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          editor.address?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredEditors(result);
  }, [searchQuery, selectedFilter, editors]);

  // Separate roles
  const editorInChief = filteredEditors.find((e) =>
    e.subRole?.toLowerCase().includes("chief")
  );
  const associateEditors = filteredEditors.filter(
    (e) =>
      e.subRole?.toLowerCase().includes("associate") &&
      !e.subRole?.toLowerCase().includes("chief")
  );
  const boardMembers = filteredEditors.filter(
    (e) =>
      !e.subRole ||
      (!e.subRole.toLowerCase().includes("chief") &&
        !e.subRole.toLowerCase().includes("associate"))
  );

  // Editor Card
  const EditorCard = ({ editor, variant = "default" }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className={`rounded-2xl p-6  transition-transform duration-300 ease-in transform border ${
        variant === "chief"
          ? " border-blue-200 shadow-lg"
          : " shadow-sm hover:shadow-md"
      }`}
    >
      <div className="flex items-start gap-5">
        <div className="flex-shrink-0 w-14 h-14  rounded-full flex items-center justify-center shadow-inner">
          <User className="w-7 h-7 text-blue-700" />
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold text-gray-700 ${
              variant === "chief" ? "text-xl" : "text-lg"
            }`}
          >
            {editor.name}
          </h3>
          {editor.subRole && (
            <p
              className={`font-medium ${
                variant === "chief"
                  ? "text-blue-600"
                  : "text-blue-500 text-sm mb-2"
              }`}
            >
              {editor.subRole}
            </p>
          )}
          {editor.backGround && (
            <p className="text-gray-700 text-sm leading-relaxed mb-2">
              {editor.backGround}
            </p>
          )}
          {editor.address && (
            <div className="flex items-start gap-2 mt-1 text-gray-700 text-sm">
              <Building2 className="w-4 h-4 text-gray-800 mt-0.5" />
              <p>{editor.address}</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  // Skeleton Loader Component
  const SkeletonCard = ({ variant = "default" }) => (
    <div
      className={`rounded-2xl p-6 border ${
        variant === "chief"
          ? "border-blue-200 bg-linear-to-br from-blue-50 to-white"
          : "border-gray-100 bg-white"
      } animate-pulse`}
    >
      <div className="flex items-start gap-5">
        <div className="w-14 h-14 bg-gray-200 rounded-full"></div>
        <div className="flex-1 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen ">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium shadow mb-4">
            Editorial Excellence
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-gray-900">
            Editorial Board
          </h1>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Our editorial board is composed of globally recognized scholars and
            professionals who uphold the journal’s commitment to excellence,
            ethics, and innovation.
          </p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          className="mb-12 bg-white/40 rounded-2xl border border-gray-200 shadow-sm p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-100 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, role, or affiliation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { value: "all", label: "All Members" },
                { value: "chief", label: "Editor-in-Chief" },
                { value: "associate", label: "Associate Editors" },
                { value: "member", label: "Board Members" },
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setSelectedFilter(filter.value)}
                  className={`px-5 py-2.5 rounded-lg font-medium border transition-all ${
                    selectedFilter === filter.value
                      ? "bg-[#0782df] text-white border-transparent shadow"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Skeleton Loader */}
        {loading && (
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-700 pb-2">
                Editor-in-Chief
              </h2>
              <div className="max-w-4xl">
                <SkeletonCard variant="chief" />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">
                Associate Editors
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">
                Editorial Board Members
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-700 p-5 rounded-md shadow-sm">
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        )}

        {/* Actual Data */}
        {!loading && !error && filteredEditors.length > 0 && (
          <div className="space-y-16">
            {editorInChief && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-700 pb-2">
                  Editor-in-Chief
                </h2>
                <div className="max-w-4xl">
                  <EditorCard editor={editorInChief} variant="chief" />
                </div>
              </section>
            )}

            {associateEditors.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">
                  Associate Editors
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {associateEditors.map((editor) => (
                    <EditorCard key={editor._id} editor={editor} />
                  ))}
                </div>
              </section>
            )}

            {boardMembers.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">
                  Editorial Board Members
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {boardMembers.map((member) => (
                    <EditorCard key={member._id} editor={member} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
