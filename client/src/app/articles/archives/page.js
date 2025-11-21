"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaBookOpen } from "react-icons/fa";
import { MdCategory, MdLink } from "react-icons/md";
import { getArchivedIssues } from "@/api/adminApi";

export default function Archives() {
  const [archives, setArchives] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArchives = async () => {
      const res = await getArchivedIssues();
      if (res.status === 200) {
        setArchives(res.data);
      }
      setLoading(false);
    };
    fetchArchives();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-900 text-lg">
        Loading archived issues...
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Archived Issues
      </h1>

      {archives.length === 0 ? (
        <p className="text-gray-700 text-center">No archived issues found.</p>
      ) : (
        <div className=" space-y-3">
               {archives.map((issue, i) => {
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
                       <div className="text-sm text-gray-500 flex items-center gap-2">
                       <MdCategory /> latest Issue
                     </div>
       
                     <p className="font-medium text-gray-800">
                       By {article?.authorName || "Unknown Author"}
                     </p>
                     {article?.affiliation && (
                       <p className="text-sm text-gray-500">{article.affiliation}</p>
                     )}
                   <span className="text-blue-700 flex items-center gap-1">
                      <MdLink /> <a className=" " target="_blank" href={`http://localhost:5000${article.uploadedManuscriptMetaData?.url}`}>Read Article</a>
                   </span>
                     <p className="text-xs text-gray-400 ">
                       Published on {new Date(issue.publishedAt).toLocaleDateString()}
                     </p>
                     </div>
                   </motion.div>
                 );
               })}
             </div>
      )}
    </main>
  );
}
