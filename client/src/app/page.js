"use client";
import { useState, useEffect } from "react";
import {
  FiUploadCloud,
  FiUsers,
  FiBookOpen,
  FiAward,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";

export default function Home() {
  const StatsCounter = ({ end, label, icon: Icon }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [end]);

    return (
      <div className="text-center p-6 bg-white rounded-xl shadow-sm border">
        <Icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
        <div className="text-4xl font-bold text-gray-900 mb-1">{count}+</div>
        <div className="text-sm text-gray-600">{label}</div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pt-25">
      {/* =======================
          SCIENCEDIRECT STYLE HEADER
      ======================== */}
      <header className="w-full border-b bg-white">
        {/* Top Red Banner */}
        <div className="bg-[#245696] w-full py-10 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
            {/* Left – Cover Image */}
            <img
              src="/IJIRSE.jpg"
              className="w-50 h-66 object-cover shadow-2xl rounded relative -top-24"
            />

            {/* Center – Journal Name */}
            <div className="text-white md:flex-1">
              <h1 className="text-4xl font-bold">
                International journal of interdisciplinary Research in Sciences and Engineering
              </h1>
              <p className="text-lg opacity-90 mt-2">Supports open access</p>
            </div>

            {/* Right – Stats like CiteScore */}
            <div className="text-white text-right">
              <p className="text-3xl font-bold">8.0</p>
              <p className="opacity-90 mb-4">CiteScore</p>

              <p className="text-3xl font-bold">4.7</p>
              <p className="opacity-90">Impact Score</p>
            </div>
          </div>
        </div>

        {/* Tabs Row */}
        {/* <div className="w-full border-t bg-white">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 py-4 px-6 text-gray-700 font-medium">
            <div className="flex flex-wrap gap-6">
              <button className="hover:text-blue-600">Articles & Issues</button>
              <button className="hover:text-blue-600">About</button>
              <button className="hover:text-blue-600">Publish</button>
              <button className="hover:text-blue-600">Order Journal</button>
            </div>

            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Search in this journal"
                className="border rounded-full px-4 py-2 text-sm"
              />

              <a
                href="/publish/submit-article"
                className="px-4 py-2 bg-[#245696] text-white rounded-full hover:bg-blue-700"
              >
                Submit Your Article
              </a>

              <button className="hover:text-blue-600">Guide for Authors</button>
            </div>
          </div>
        </div> */}
      </header>

      {/* =======================
          MAIN CONTENT (Your Content)
      ======================== */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Your Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-6">Welcome to the IJIRSE</h1>

          <p className="text-lg max-w-3xl mx-auto mb-10">
            A peer-reviewed open-access journal dedicated to publishing innovative
            research and insights in chemistry, biology, and interdisciplinary
            sciences.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a
              href="/publish/submit-article"
              className="px-8 py-4 bg-[#245696] text-white rounded-full font-semibold shadow hover:shadow-lg transition"
            >
              Submit Your Research
            </a>
            <a
              href="/articles/latest-issues"
              className="px-8 py-4 bg-white border text-gray-800 rounded-full font-semibold shadow hover:shadow-lg transition"
            >
              Browse Articles
            </a>
          </div>

          {/* Stats Counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <StatsCounter end={250} label="Published Articles" icon={FiBookOpen} />
            <StatsCounter end={150} label="Active Researchers" icon={FiUsers} />
            <StatsCounter end={45} label="Countries" icon={FiTrendingUp} />
            <StatsCounter end={98} label="Impact Score" icon={FiAward} />
          </div>
        </section>

        {/* Feature Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Latest Issue */}
          <div className="bg-white p-8 rounded-3xl shadow hover:shadow-xl transition border">
            <FiBookOpen className="w-12 h-12 text-blue-600 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Latest Issue</h2>
            <p className="font-semibold">Volume 3, Issue 12 — October 2025</p>
            <p className="text-gray-600 mt-2 mb-4">
              Explore cutting-edge research advancing chemical and biological sciences.
            </p>
            <a href="/articles/latest-issues" className="text-blue-600 font-semibold">
              View Current Issue →
            </a>
          </div>

          {/* Submit Article */}
          <div className="bg-white p-8 rounded-3xl shadow hover:shadow-xl transition border">
            <FiUploadCloud className="w-12 h-12 text-blue-600 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Submit Your Article</h2>
            <p className="text-gray-600 mb-4">
              Share your groundbreaking research with the global scientific community.
            </p>
            <a href="/publish/submit-article" className="text-blue-600 font-semibold">
              Submit Now →
            </a>
          </div>

          {/* Editorial Board */}
          <div className="bg-white p-8 rounded-3xl shadow hover:shadow-xl transition border">
            <FiUsers className="w-12 h-12 text-blue-600 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Editorial Board</h2>
            <p className="text-gray-600 mb-4">
              Meet our distinguished team of world-renowned researchers and
              academicians.
            </p>
            <a
              href="/about/editorial-board"
              className="text-blue-600 font-semibold"
            >
              Meet the Team →
            </a>
          </div>
        </section>

        {/* Why Publish With Us */}
        <section className="bg-white p-12 rounded-3xl shadow-xl border">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Publish With Us?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Fast Review */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#245696] text-white rounded-xl flex items-center justify-center mx-auto mb-4">
                <FiZap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Review</h3>
              <p className="text-gray-600">
                Average review time of 2–3 weeks with expert reviewers.
              </p>
            </div>

            {/* High Visibility */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#245696] text-white rounded-xl flex items-center justify-center mx-auto mb-4">
                <FiTrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">High Visibility</h3>
              <p className="text-gray-600">
                Indexed in major databases with global reach.
              </p>
            </div>

            {/* Open Access */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#245696] text-white rounded-xl flex items-center justify-center mx-auto mb-4">
                <FiAward className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Open Access</h3>
              <p className="text-gray-600">
                Your research freely available to researchers worldwide.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
