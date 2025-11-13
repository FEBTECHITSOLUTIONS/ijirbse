export default function Footer() {
  return (
    <footer className="bg-gray-100/80 text-gray-700 border-t border-gray-200 mt-12 mb-4 mx-4 rounded-3xl">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          {/* Left Section */}
          <div>
            <h3 className="text-lg font-semibold text-blue-700">
              International Journal of Interdisciplinary Research in Basic Sciences & Engineering (IJIRBSE)
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Advancing knowledge across Science and Engineering disciplines.
            </p>
          </div>

          {/* Middle Section – Quick Links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-gray-700">
            <a href="/about/aims" className="hover:text-blue-700 transition">
              About
            </a>
            <a href="/publish/guide-for-authors" className="hover:text-blue-700 transition">
              Guide for Authors
            </a>
            <a href="/publish/submit-article" className="hover:text-blue-700 transition">
              Submit Article
            </a>
            <a href="/contact" className="hover:text-blue-700 transition">
              Contact
            </a>
          </div>

          {/* Right Section */}
          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} IJIRBSE. All rights reserved.
          </div>
        </div>

        <div className="text-center text-xs text-gray-500 mt-6">
          Designed and maintained by the FebTech It Solutions PVT. LTD. Web Team.
        </div>
      </div>
    </footer>
  );
}
