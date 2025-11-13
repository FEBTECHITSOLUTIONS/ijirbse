"use client";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function SubmitArticle() {
  const [formData, setFormData] = useState({
    authorName: "",
    affiliation: "",
    email: "",
    title: "",
    file: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.file) {
      toast.error("Please upload a manuscript file before submitting.");
      return;
    }

    // Max file size 10MB
    if (formData.file.size > 10 * 1024 * 1024) {
      toast.error("File size exceeds 10MB limit.");
      return;
    }

    const data = new FormData();
    data.append("authorName", formData.authorName);
    data.append("affiliation", formData.affiliation);
    data.append("email", formData.email);
    data.append("title", formData.title);
    data.append("article", formData.file);

    try {
      setIsSubmitting(true);
      const response = await fetch("http://localhost:5000/api/uploadarticle", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        toast.success("Your article has been submitted successfully!", {
          duration: 5000,
          position: "top-center",
        });

        // Reset form
        setFormData({
          authorName: "",
          affiliation: "",
          email: "",
          title: "",
          file: null,
        });
        fileInputRef.current.value = null;
      } else {
        toast.error("Submission failed. Please try again.", {
          duration: 5000,
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error submitting article:", error);
      toast.error("Server error. Please try again later.", {
        duration: 5000,
        position: "top-center",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen ">
      <Toaster />
      <main className="grow flex justify-center items-center py-12 px-4">
        <div className="w-full max-w-3xl border p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-200">
            Submit Your Research Article
          </h1>

          <p className="text-gray-100 text-center mb-8">
            Authors are invited to submit original manuscripts directly through this platform.
            Please ensure your article follows the{" "}
            <a
              href="guide-for-authors"
              className="text-blue-500 underline hover:text-blue-400"
            >
              Guide for Authors
            </a>{" "}
            before submission.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-1 font-semibold text-gray-200">
                Author Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="authorName"
                value={formData.authorName}
                onChange={handleChange}
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2 rounded"
                placeholder="John Doe"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-200">
                Affiliation <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="affiliation"
                value={formData.affiliation}
                onChange={handleChange}
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2 rounded"
                placeholder="University/Institute"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-200">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2 rounded"
                placeholder="email@example.com"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-200">
                Article Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2 rounded"
                placeholder="Title of your research"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-200">
                Upload Manuscript <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="file"
                onChange={handleChange}
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2 rounded"
                accept=".pdf,.doc,.docx"
                ref={fileInputRef}
                disabled={isSubmitting}
              />
              <p className="text-sm text-gray-100 mt-1">
                Accepted formats: <strong>.docx</strong> or <strong>.pdf</strong> | Max size: 10MB
              </p>
              {formData.file && (
                <p className="text-sm text-blue-500 mt-1">Selected file: {formData.file.name}</p>
              )}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${
                  isSubmitting
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-linear-to-r  from-[#0782df] to-[#0b111d] hover:to-blue-600"
                } text-white font-semibold px-8 py-2.5 rounded-lg shadow transition`}
              >
                {isSubmitting ? "Submitting..." : "Submit Article"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
