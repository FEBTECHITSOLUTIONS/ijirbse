"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { FiTarget, FiAward, FiClock, FiDatabase, FiCheckCircle } from "react-icons/fi";

const FloatingParticle = ({ delay = 0 }) => (
  <div
    className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
    style={{
      animation: `float ${8 + delay}s ease-in-out infinite`,
      animationDelay: `${delay}s`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
  />
);

export default function Aims() {
  useEffect(() => {
    // This is only to ensure particles are rendered after mount
  }, []);

  const fields = [
    "Chemistry",
    "Chemical Engineering",
    "Mathematics",
    "Petroleum Engineering",
    "Physics",
    "Artificial Intelligence",
    "Nanoscience",
    "Environmental Engineering",
    "Statistics",
    "Electrical Engineering",
    "Biochemistry",
    "Civil Engineering",
    "Biological Science",
    "Industrial Engineering",
    "Natural Science",
    "Computer Science and Technology",
    "General Study Skills",
    "Engineering and Technologies",
    "Life Sciences",
    "Food and Agricultural Science",
    "Earth Science",
    "Mechanical Engineering",
    "Material Science",
    "Renewable Energy Engineering",
  ];

  return (
    <div className="flex flex-col min-h-screen  relative ">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
          50% { transform: translateY(-30px) translateX(10px); opacity: 0.4; }
        }
      `}</style>

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <FloatingParticle key={i} delay={i * 0.1} />
      ))}

      <main className="grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Hero Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium shadow-lg mb-6">
            <FiTarget className="w-4 h-4" />
            Our Mission & Scope
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-blue-600">
            Aims & Scope
          </h1>
          <div className="w-24 h-1 bg-linear-to-r from-[#0782df] to-[#0b111d] mx-auto rounded-full"></div>
        </motion.div>

        {/* Introduction Section */}
        <motion.section
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-10 border border-white/50"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="space-y-6 text-justify text-gray-700 leading-relaxed">
            <p className="text-lg">
              The <strong className="text-blue-600">International journal of interdisciplinary Research in Sciences and Engineering (IJIRBSE)</strong> 
              is devoted to the publication of high-quality original research articles, reviews, and short communications 
              that advance knowledge in Sciences, Engineering, and their interfaces.
            </p>

            <p className="text-lg">
              The Journal provides a platform for researchers to explore innovative ideas in Sciences, Engineering, 
              and Interdisciplinary Research. The following areas reflect, but are not limited to, the scope of the journal. 
              Any topic fitting within the scope of the journal is welcomed for submission.
            </p>
          </div>
        </motion.section>

        {/* Scope Section with Framer Motion */}
        <motion.section
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-10 border border-white/50"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-linear-to-br  from-[#0782df] to-[#0b111d] rounded-xl flex items-center justify-center shadow-lg">
              <FiAward className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Scope of the Journal</h2>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.05 },
              },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {fields.map((field) => (
              <motion.div
                key={field}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                className="group bg-linear-to-br from-white to-gray-50 hover:from-blue-50 hover:to-purple-50 transition-all duration-300 rounded-xl p-4 text-center shadow-md hover:shadow-lg border border-gray-200 hover:border-blue-300"
              >
                <p className="text-sm sm:text-base font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                  {field}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Publishing Details Section */}
        <motion.section
          className="border rounded-3xl shadow-2xl p-8 text-black"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <FiCheckCircle className="w-6 h-6" />
            Publishing Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Publishing Options */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <FiAward className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-lg">Publishing Options</h3>
              </div>
              <p className="text-black">Open Access</p>
            </div>

            {/* Publication Timeline */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <FiClock className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-lg">Publication Timeline</h3>
              </div>
              <p className="text-black">30–90 days</p>
            </div>

            {/* Indexing */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 md:col-span-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <FiDatabase className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-lg">Indexing</h3>
              </div>
              <p className="text-black text-sm leading-relaxed">
                Research Gate (Under process), Google Scholar (Under process), 
                Chemical Abstract (Under process), Index Copernicus (Under process), Scopus (Under process)
              </p>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
