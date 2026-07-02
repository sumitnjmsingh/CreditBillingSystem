import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 border-t border-slate-700 mt-auto">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left Section */}

          <div>
            <h2 className="text-xl font-bold text-white">
              💳 Credit Billing System
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              Secure • Reliable • Fast
            </p>
          </div>

          {/* Center Section */}

          <div className="text-center">
            <p className="text-sm">
              © {new Date().getFullYear()} Credit Billing System
            </p>

            <p className="text-xs text-gray-500 mt-1">
              Built using React • Tailwind CSS • Play Framework
            </p>
          </div>

          {/* Right Section */}

          <div className="flex items-center gap-5">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition duration-300"
            >
              <FaGithub size={22} />
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400 transition duration-300"
            >
              <FaLinkedin size={22} />
            </a>

            <a
              href="#"
              className="hover:text-green-400 transition duration-300"
            >
              <FaGlobe size={22} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
