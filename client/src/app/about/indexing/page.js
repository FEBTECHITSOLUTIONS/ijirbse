"use client";

import { motion } from "framer-motion";
import { FiDatabase, FiAward, FiClock, FiBookOpen } from "react-icons/fi";

export default function Indexing() {
  const indexList = [
    "Research Gate (Under Process)",
    "Google Scholar (Under Process)",
    "Chemical Abstract (Under Process)",
    "Index Copernicus (Under Process)",
    "Scopus (Under Process)",
  ];

  return (
    <div className="flex flex-col min-h-screen ">

      <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r  from-[#0782df] to-[#0b111d] text-white rounded-full text-sm font-medium shadow-lg mb-6">
            <FiDatabase className="w-4 h-4" />
            Journal Indexing
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r  from-[#0782df] to-[#5d84d3]">
            Journal Indexing & Insight
          </h1>

          <div className="w-24 h-1 bg-linear-to-r  from-[#0782df] to-[#0b111d] mx-auto rounded-full"></div>
        </motion.div>

        {/* Introduction */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-10 border border-white/50 text-gray-700 leading-relaxed text-justify"
        >
          <p className="text-lg mb-6">
            The{" "}
            <strong className="text-blue-600">
              International Journal of Interdisciplinary Research in Basic
              Sciences and Engineering (IJIRBSE)
            </strong>{" "}
            is committed to promoting high-quality research across multiple
            scientific disciplines. The journal follows a rigorous double-blind
            peer review process and publishes open-access articles to ensure
            wide dissemination of knowledge.
          </p>

          <p className="text-lg">
            The journal is currently under the process of inclusion in major
            academic and scientific indexing databases. Once approved, the
            indexing details will be regularly updated on the journal website.
          </p>
        </motion.section>

        {/* Indexing Status */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-10 border border-white/50"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-linear-to-r  from-[#0782df] to-[#0b111d] rounded-xl flex items-center justify-center shadow-lg">
              <FiAward className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              Current Indexing Status
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 text-gray-700">
            {indexList.map((index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="p-5 bg-linear-to-br from-white to-gray-50 hover:from-blue-50 hover:to-purple-50 rounded-xl shadow-md border border-gray-200 hover:border-blue-300 text-center font-medium"
              >
                {index}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Journal Insight */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className=" rounded-3xl shadow-2xl p-8 text-white border border-white/20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-linear-to-r  from-[#0782df] to-[#0b111d] rounded-xl flex items-center justify-center shadow-lg">
              <FiBookOpen className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold">Journal Insight</h2>
          </div>

          <div className="space-y-5 text-blue-50">
            <p className="text-lg">
              <strong className="text-white">ISSN No.:</strong> Under Process
            </p>

            <p className="text-lg">
              <strong className="text-white">Subject Areas:</strong> Chemistry,
              Mathematics, Physics, Nanoscience, Statistics, Biochemistry,
              Biological Science, Natural Science, General Study Skills, Life
              Sciences, Earth Science, Material Science, Chemical Engineering,
              Petroleum Engineering, Artificial Intelligence, Environmental
              Engineering, Electrical Engineering, Civil Engineering, Industrial
              Engineering, Computer Science and Technology, Engineering and
              Technologies, Food and Agricultural Science, Mechanical
              Engineering, Renewable Energy Engineering.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 pt-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 flex items-center gap-3">
                <FiAward className="w-6 h-6 text-white" />
                <div>
                  <h3 className="font-semibold text-white text-lg">
                    Article Publishing Options
                  </h3>
                  <p className="text-blue-100">Open Access</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 flex items-center gap-3">
                <FiClock className="w-6 h-6 text-white" />
                <div>
                  <h3 className="font-semibold text-white text-lg">
                    Publication Timeline
                  </h3>
                  <p className="text-blue-100">30–90 Days</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
