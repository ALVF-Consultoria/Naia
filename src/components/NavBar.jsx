// src/components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import { Globe, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/create-history", label: "Create Story" },
    { to: "/translate-story", label: "Translate Story", icon: <Globe size={16} /> },
  ];

  return (
    <nav className="w-full bg-white border-b border-blue-100 fixed top-0 left-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* LOGO */}
        <Link 
          to="/" 
          className="text-xl font-bold text-blue-600 hover:text-blue-800 transition"
          onClick={() => setIsOpen(false)}
        >
          NA<span className="text-blue-400">IA</span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex space-x-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative flex items-center gap-1 text-gray-700 hover:text-blue-700 transition font-medium ${
                location.pathname === link.to ? "text-blue-700" : ""
              }`}
            >
              {link.icon && <span className="text-blue-500">{link.icon}</span>}
              {link.label}
              {/* Animated underline */}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] w-full transform scale-x-0 transition-transform origin-left ${
                  location.pathname === link.to
                    ? "bg-blue-600 scale-x-100"
                    : "bg-blue-600 group-hover:scale-x-100"
                }`}
              />
            </Link>
          ))}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-blue-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-blue-100 shadow-md flex flex-col px-6 py-4 space-y-4">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2 text-gray-700 hover:text-blue-700 transition font-medium ${
                location.pathname === link.to ? "text-blue-700" : ""
              }`}
            >
              {link.icon && <span className="text-blue-500">{link.icon}</span>}
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
