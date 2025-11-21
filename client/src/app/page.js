"use client"
import { useState, useEffect } from 'react';
import { FiUploadCloud, FiUsers, FiBookOpen, FiAward, FiTrendingUp, FiZap } from "react-icons/fi";
import lottieChemistry from "../../public/animations/RedNetworkGlobe.json"; 
import Lottie from 'lottie-react';
import VerticalCarousel from '@/components/VerticalCarousel';


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
    <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20">
      <Icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
      <div className="text-4xl font-bold text-gray-900 mb-1">{count}+</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
};

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen  relative ">
      

    
      
      <main className="grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 overflow-x-hidden">
        {/* Hero Section */}
        <section className={`text-center mb-20 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
           <div className="w-[300vw] md:w-full absolute -z-10 blur-sm ">
              <Lottie animationData={lottieChemistry} loop={true} />
            </div>
         
          
          <h1 className="text-5xl sm:text-7xl font-extrabold leading-tight mb-6  ">
            Welcome to the IJIBSE
          </h1>
           
           <div className=' absolute right-0 hidden lg:block'>
            <VerticalCarousel />
           </div>

        {/* this part responsive */}
       {/* this part responsive */}
<div className="flex flex-col w-fit xl:flex-row items-center gap-8 lg:gap-16 my-12 bg-amber-30">
  <img
    className="w-full max-w-sm lg:max-w-75  rounded-2xl shadow-lg object-cover"
    src="/IJIRBSE.jpg"
    alt="IJIRBSE journal cover"
  />
  
  <div className="text-center lg:text-left xl:max-w-xl ">
    <p className="text-2xl sm:text-3xl font-semibold text-white mb-4">
      International Journal of Interdisciplinary Research in Chemistry & Biology
    </p>
    
    <p className="text-base sm:text-lg text-gray-100 leading-relaxed">
      The <strong>International Journal of Interdisciplinary Research in Basic Sciences and Engineering (IJIRBSE)</strong> 
      is devoted to publishing high-quality original research articles, reviews, and short communications that advance 
      knowledge of Basic Sciences and Engineering and their interdisciplinary interfaces. It provides a platform for researchers to explore innovative ideas in Basic Sciences, Engineering, and Interdisciplinary Research. The following areas reflect, but are not limited to, the scope of the journal. Any topic fitting within the scope of the journal is welcomed for submission.
    </p>
  </div>
</div>

           
       
          
          <p className="text-lg max-w-2xl lg:max-w-3xl mx-auto px-6 mb-10 ">
            A peer-reviewed open-access journal dedicated to publishing innovative research
            and insights in chemistry, biology, and interdisciplinary sciences.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <a href='/publish/submit-article' className="px-8 py-4 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-full font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
              <FiUploadCloud className="w-5 h-5" />
              Submit Your Research
            </a>
            <a href='/articles/latest-issues' className="px-8 py-4 bg-white text-gray-800 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-200">
              Browse Articles
            </a>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <StatsCounter end={250} label="Published Articles" icon={FiBookOpen} />
            <StatsCounter end={150} label="Active Researchers" icon={FiUsers} />
            <StatsCounter end={45} label="Countries" icon={FiTrendingUp} />
            <StatsCounter end={98} label="Impact Score" icon={FiAward} />
          </div>
        </section>

        {/* Feature Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Card 1 - Latest Issue */}
          <div className="group relative p-8 bg-linear-to-br from-blue-500 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <FiBookOpen className="w-12 h-12 text-white mb-4" />
              <h2 className="font-bold text-2xl text-white mb-3">Latest Issue</h2>
              <p className="text-blue-100 mb-2">
                <span className="font-semibold text-white">Volume 3, Issue 12</span> — October 2025
              </p>
              <p className="text-sm text-blue-100 mb-6">
                Explore cutting-edge research advancing chemical and biological sciences.
              </p>
              <a
                href="/articles/latest-issues"
                className="inline-flex items-center gap-2 text-white font-semibold hover:gap-4 transition-all"
              >
                View Current Issue 
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Card 2 - Submit Article */}
          <div className="group relative p-8 bg-linear-to-br from-blue-500 to-90%  rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/50 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <FiUploadCloud className="w-12 h-12 text-white mb-4" />
              <h2 className="font-bold text-2xl text-white mb-3">Submit Your Article</h2>
              <p className="text-purple-100 mb-6">
                Share your groundbreaking research with the global scientific community.
              </p>
              <a
                href="/publish/submit-article"
                className="inline-flex items-center gap-2 text-white font-semibold hover:gap-4 transition-all"
              >
                Submit Now 
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Card 3 - Editorial Board */}
          <div className="group relative p-8 bg-linear-to-br to-blue-500 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <FiUsers className="w-12 h-12 text-white mb-4" />
              <h2 className="font-bold text-2xl text-white mb-3">Editorial Board</h2>
              <p className="text-pink-100 mb-6">
                Meet our distinguished team of world-renowned researchers and academicians.
              </p>
              <a
                href="/about/editorial-board"
                className="inline-flex items-center gap-2 text-white font-semibold hover:gap-4 transition-all"
              >
                Meet the Team 
                <span>→</span>
              </a>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="bg-white rounded-3xl shadow-2xl p-12 mb-16">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Why Publish With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-linear-to-br from-[#0782df] to-[#0b111d]  rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FiZap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Review</h3>
              <p className="text-gray-600">Average review time of 2-3 weeks with expert peer reviewers</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-linear-to-br from-[#0782df] to-[#0b111d] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FiTrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">High Visibility</h3>
              <p className="text-gray-600">Indexed in major databases with global reach</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-linear-to-br from-[#0782df] to-[#0b111d] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FiAward className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Open Access</h3>
              <p className="text-gray-600">Your research freely available to researchers worldwide</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}