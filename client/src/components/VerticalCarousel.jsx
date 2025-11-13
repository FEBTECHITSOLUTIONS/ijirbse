"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const scopes = [
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
  "Renewable Energy Engineering"
];

export default function VerticalCarousel() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      y: ["0%", "-50%"],
      transition: {
        duration: 30,
        repeat: Infinity,
        ease: "linear"
      }
    });
  }, [controls]);

  // Duplicate the array to make seamless infinite scroll
  const repeatedScopes = [...scopes, ...scopes];

  return (
    <div className="w-64 h-96 overflow-hidden mx-auto relative rounded-3xl ">
      <motion.div
        animate={controls}
        className="flex flex-col gap-4 absolute top-0 left-0 w-full"
      >
        {repeatedScopes.map((scope, index) => (
          <div
            key={index}
            className="text-center text-white font-medium text-lg py-3 px-4 rounded-lg  backdrop-blur-sm shadow-sm hover:bg-white/30 transition"
          >
            {scope}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
