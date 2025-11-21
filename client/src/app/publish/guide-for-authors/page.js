"use client";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiBookOpen, FiMail, FiUpload } from "react-icons/fi";

export default function GuideForAuthors() {
  const [loading, setLoading] = useState(true);

  // Simulate loading for skeleton
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen ">

      <main className="grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          // Skeleton Loader
          <div className="space-y-6 animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-1/2 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
            <div className="space-y-3 mt-10">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-3 bg-gray-200 rounded w-full"></div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium shadow-lg mb-4">
                <FiBookOpen className="w-4 h-4" />
                Author Guidelines
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-blue-600 ">
                Guide for Authors
              </h1>
              <div className="w-24 h-1 bg-linear-to-r  from-[#0782df] to-[#0b111d] mx-auto rounded-full "></div>
            </motion.div>

            {/* Intro */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow p-8 mb-10 text-gray-700 leading-relaxed text-justify border border-gray-100"
            >
              <p>
                Authors are invited to submit original research articles, review papers, and
                short communications that align with the scope of the{" "}
                <strong className="text-blue-600">
                  International Journal of Interdisciplinary Research in Basic Sciences and
                  Engineering (IJIRBSE)
                </strong>
                . Manuscripts must be written in clear English and conform to the following
                submission guidelines.
              </p>
            </motion.section>

            {/* Sections */}
            <Section
              title="1. Types of Manuscripts"
              items={[
                { label: "Original Research Articles", text: "Full-length papers presenting novel experimental or theoretical results." },
                { label: "Review Articles", text: "Comprehensive overviews of recent developments in specific fields." },
                { label: "Short Communications / Technical Notes", text: "Concise reports of new findings or methods." }
              ]}
            />

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/80 rounded-3xl shadow p-8 mb-10 border border-gray-100"
            >
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b-2 border-gray-200 pb-2">
                2. Manuscript Preparation
              </h2>

              <div className="space-y-3 text-gray-700 mb-6">
                <p><strong>File Type:</strong> Microsoft Word (.doc or .docx)</p>
                <p><strong>Font:</strong> Times New Roman, 12-point, double-spaced</p>
                <p><strong>Page Layout:</strong> A4 size, 1-inch margins</p>
                <p><strong>Length:</strong> Typically 6–15 pages for full articles</p>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Structure of the Manuscript
              </h3>
              <ul className="list-decimal ml-6 space-y-2 text-gray-700">
                <li>Title Page — Include article title, author(s), and affiliation(s)</li>
                <li>Abstract — 150–250 words summarizing objectives, methods, results, and conclusions</li>
                <li>Keywords — 3–6 words reflecting main topics</li>
                <li>Introduction — Background, rationale, and objectives</li>
                <li>Materials and Methods — Sufficient detail for replication</li>
                <li>Results and Discussion — Present and interpret results clearly</li>
                <li>Conclusion — Summarize main findings and future directions</li>
                <li>Acknowledgments (optional)</li>
                <li>References — Follow APA, IEEE, or Vancouver style</li>
              </ul>
            </motion.section>

            <Section
              title="3. Figures and Tables"
              items={[
                "Figures must be high-resolution (minimum 300 dpi)",
                "Tables should be editable (not images)",
                "Number figures and tables consecutively (e.g., Figure 1, Table 1)",
                "Provide descriptive captions for each"
              ]}
            />

            <Section
              title="4. Ethical Considerations"
              items={[
                "Manuscripts must be original and not under review elsewhere.",
                "All authors should have contributed significantly to the research.",
                "Plagiarism or duplicate publication will lead to rejection.",
                "Research involving humans or animals must comply with ethical guidelines and include relevant approvals."
              ]}
            />

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/80 rounded-3xl shadow p-8 mb-10 border border-gray-100"
            >
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b-2 border-gray-200 pb-2">
                5. Submission Process
              </h2>

              <div className="space-y-6">
                <div className="bg-blue-50 border-l-4 border-blue-600 p-5 rounded-md">
                  <div className="flex items-center gap-2 text-blue-700 mb-2">
                    <FiUpload className="w-5 h-5" />
                    <h3 className="font-semibold text-lg">Option 1: Submit via Platform</h3>
                  </div>
                  <p className=" text-gray-800">
                    Submit your manuscript through our secure{" "}
                    <a href="submit-article" className="text-blue-600 underline hover:text-blue-800 font-medium">
                      online submission system
                    </a>. You’ll receive a confirmation once the upload is successful.
                  </p>
                </div>

                <div className="bg-green-50 border-l-4 border-green-600 p-5 rounded-md">
                  <div className="flex items-center gap-2 text-green-700 mb-2">
                    <FiMail className="w-5 h-5" />
                    <h3 className="font-semibold text-lg">Option 2: Submit via Email</h3>
                  </div>
                  <p className=" text-gray-800">
                    Email your manuscript to{" "}
                    <a href="mailto:editor@ijirbse.org" className="text-blue-600 underline hover:text-blue-800">
                      editor@ijirbse.org
                    </a>. Submissions undergo an initial editorial screening followed by a <strong>double-blind peer review</strong>.
                  </p>
                </div>
              </div>

              <p className="text-gray-700 mt-6">
                For complete formatting details, download the{" "}
                <a href="#" className="text-blue-600 underline hover:text-blue-800">
                  Author Template
                </a>.
              </p>
            </motion.section>

            <Section
              title="6. Copyright & Licensing"
              items={[
                "Upon acceptance, authors must sign a copyright transfer agreement or open-access license (e.g., Creative Commons Attribution (CC BY 4.0)).",
                "Authors retain the right to use their work with proper citation."
              ]}
            />
          </>
        )}
      </main>

    </div>
  );
}

// Reusable Section component
function Section({ title, items }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white/80 rounded-3xl shadow p-8 mb-10 border border-gray-100"
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b-2 border-gray-200 pb-2">{title}</h2>
      <ul className="list-disc ml-6 space-y-2 text-gray-700">
        {items.map((item, i) =>
          typeof item === "string" ? <li key={i}>{item}</li> : <li key={i}><strong>{item.label}:</strong> {item.text}</li>
        )}
      </ul>
    </motion.section>
  );
}
