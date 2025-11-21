import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaBookOpen, FaCalendarAlt } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { getPublishedArticles } from "../../api/adminApi";

const PublishedArticle = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await getPublishedArticles();
      if (res.status === 200) {
        setIssues(res.issues);
      }
      setLoading(false);
    };
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        Loading published articles...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 max-h-screen overflow-y-scroll">
      {issues.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          No published articles found.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {issues.map((issue, index) => {
            const article = issue.publishedArticles;
            return (
              <motion.div
                key={issue._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white shadow-md p-6 rounded-xl hover:shadow-xl transition duration-300 border border-gray-100"
              >
                {/* Header: Volume & Year */}
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-semibold text-blue-700 flex items-center gap-2">
                    <FaBookOpen /> Volume {issue.volume}
                  </h2>
                  <span className="text-sm text-gray-400 flex items-center gap-1">
                    <FaCalendarAlt /> {issue.year}
                  </span>
                </div>

                {/* Issue & Category */}
                <div className="flex items-center gap-2 mb-4 text-sm text-gray-500 relative">
                  <MdCategory /> Issue #{issue.issueNumber} • {issue.category}
                  <span className="absolute right-0">{issue.edditor?.name}</span>
                </div>

                {/* Article info */}
                {article ? (
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <p className="font-medium text-gray-800 text-sm">
                      Title : {article.articleTitle || "Untitled Article"}
                    </p>
                    <p className="text-sm text-gray-500">
                      By {article.authorName || "Unknown Author"}{" "}
                      • Affiliation : {article.affiliation ? `${article.affiliation}` : ""}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Email: {article.email}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Status:{" "}
                      {article.published
                        ? "Published"
                        : article.status.charAt(0).toUpperCase() +
                          article.status.slice(1)}
                    </p>
                     <span className=" text-sm">
                        Link : <a
                    href={`https://api.ijirbse.com${article.uploadedManuscriptMetaData?.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline  lowercase"
                  >
                 {article.uploadedManuscriptMetaData?.originalName}
                  </a>
                     </span>
                  </div>
                ) : (
                  <p className="text-gray-400 italic">No article linked</p>
                )}

                {/* Published Date */}
                <p className="mt-4 text-xs text-gray-400">
                  Published on {new Date(issue.publishedAt).toLocaleDateString()}
                </p>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PublishedArticle;
