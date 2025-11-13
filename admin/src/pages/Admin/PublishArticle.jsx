import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaNewspaper, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { publishArticle } from "../../api/adminApi";
import toast, { Toaster } from "react-hot-toast";
import { IoCloseOutline } from "react-icons/io5";

const PublishArticle = ({ articleId , closePublishArticle }) => {
  const [year, setYear] = useState("2024-2025");
  const [volume, setVolume] = useState("");
  const [issueNumber, setIssueNumber] = useState("");
  const [category, setCategory] = useState("latest");
  const [uploadedFileId, setUploadedFileId] = useState(articleId || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await publishArticle({
        year,
        volume,
        issueNumber,
        category,
        uploadedFileId,
      });
      console.log(res);
      
      if (res.status === 201) {
        toast.success(res.message)
        setTimeout(() => {
          closePublishArticle()
        }, 100);
      } else {
        toast.error(res.message)
      }
      
      setVolume("");
      setIssueNumber("");
    } catch (err) {
      toast.error("error2:",err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-fit flex items-center justify-center relative">
            <Toaster position="top-center" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6"
      >
        <span onClick={()=>{closePublishArticle()}} className=" absolute right-10 text-3xl cursor-pointer">
          <IoCloseOutline />
        </span>
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <FaNewspaper className="text-blue-600 text-3xl" />
          <h2 className="text-2xl font-bold text-gray-800">Publish Article</h2>
        </div>

        <p className="text-gray-500 text-center text-sm mb-8">
          Assign this uploaded article to a journal issue.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 grid grid-cols-2 gap-4">
          {/* Academic Year */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Academic Year
            </label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {[
                "2023-2024",
                "2024-2025",
                "2025-2026",
                "2026-2027",
                "2027-2028",
                "2028-2029",
              ].map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>
          </div>

          {/* Volume */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Volume
            </label>
            <input
              type="number"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              placeholder="e.g. 12"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Issue Number */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Issue Number
            </label>
            <input
              type="number"
              value={issueNumber}
              onChange={(e) => setIssueNumber(e.target.value)}
              placeholder="e.g. 2"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Category
            </label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value="latest"
                  checked={category === "latest"}
                  onChange={(e) => setCategory(e.target.value)}
                  className="text-blue-500 focus:ring-blue-400"
                />
                <span>Latest Issue</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value="archive"
                  checked={category === "archive"}
                  onChange={(e) => setCategory(e.target.value)}
                  className="text-blue-500 focus:ring-blue-400"
                />
                <span>Archive</span>
              </label>
            </div>
          </div>

          {/* Uploaded File ID */}
          <div className=" col-span-2 gap-1">
            <label className="block text-gray-700 font-medium mb-1">
              Uploaded File ID
            </label>
            <p
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            > ${articleId}</p>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2 py-2.5 rounded-lg text-white font-semibold transition col-span-2 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="border-t-2 border-white rounded-full w-5 h-5"
                ></motion.div>
                Publishing...
              </>
            ) : (
              "Publish Article"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default PublishArticle;
