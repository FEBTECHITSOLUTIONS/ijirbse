"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaBookOpen, FaCalendarAlt } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { MdLink } from "react-icons/md";
import axios from "axios";

export default function LatestIssues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestIssue = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_APPLICATION_URL}/api/latest-issue`);
        console.log(res);
        
        if (res.status === 200) {
          setIssues(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching latest issue:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestIssue();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-800">
        Loading latest issue...
      </div>
    );
  }

  if (!issues.length) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-500">
        No latest issues found.
      </div>
    );
  }

  // Extract year, volume, and issueNumber from first issue (they all share same)
  const { year, volume, issueNumber } = issues[0];

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Latest Issue
      </h1>

      {/* Issue Info Header */}
      <div className="text-center mb-10">
        <p className="text-lg text-blue-500 font-semibold">
          Academic Year: {year}
        </p>
        <p className="text-md text-gray-700">
          Volume {volume} • Issue {issueNumber}
        </p>
      </div>

      {/* Articles Grid */}
      <div className=" space-y-3">
        {issues.map((issue, i) => {
          const article = issue.publishedArticles;
          return (
            <motion.div
              key={issue._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="py-1 px-3 lowercase flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition"
            >
              <div className="flex items-center justify-between w-full ">
                <h2 className="text-xl font-semibold text-blue-700 flex items-center gap-2">
                  <FaBookOpen /> {article?.articleTitle || "Untitled Article"}
                </h2>
              </div>

              <div className=" w-full flex justify-between items-center gap-6">
                <div className="text-sm text-gray-900 flex items-center gap-2">
                <MdCategory /> latest Issue
              </div>

              <p className="font-medium text-gray-800">
                By {article?.authorName || "Unknown Author"}
              </p>
              {article?.affiliation && (
                <p className="text-sm text-gray-500">{article.affiliation}</p>
              )}
            <span className="text-blue-700 flex items-center gap-1">
               <MdLink /> <a className=" " target="_blank" href={`${process.env.NEXT_PUBLIC_APPLICATION_URL}${article.uploadedManuscriptMetaData?.url}`}>Read Article</a>
            </span>
              <p className="text-xs text-gray-400 ">
                Published on {new Date(issue.publishedAt).toLocaleDateString()}
              </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}
