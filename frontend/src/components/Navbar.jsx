import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import profile from "../assets/profile.jpeg";
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { to: "/", label: "Report" },
    { to: "/survivors", label: "Survivors" },
    { to: "/inventory", label: "Inventory" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-[#3E1F47] text-white sticky top-0 z-50">
      <div className="my-container mx-auto flex justify-between items-center px-4 py-4">
        <div className="flex items-center ">
          <NavLink to="/" className="flex items-center mr-30">
            <img
              src={logo}
              alt="Logo"
              className="w-[35px] h-[35px] mr-2 rounded-md"
            />
            <span className="text-[16px] font-semibold">Survival Nexus</span>
          </NavLink>

          <div className="hidden lg:flex space-x-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md hover:bg-[#5A3263] hover:text-white text-[14px] ${
                    isActive ? "bg-[#200c24]" : ""
                  }`
                }
                onClick={toggleMobileMenu}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white hover:text-gray-300 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        <div className="hidden lg:block ml-6 ">
          <img
            src={profile}
            alt="Profile"
            className="w-[35px] h-[35px] rounded-full border-[1.5px] border-white"
          />
        </div>
      </div>

      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-3/4 bg-gray-800 z-50 transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4">
          <button
            onClick={toggleMobileMenu}
            className="text-white hover:text-gray-300 absolute top-2 right-2 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="flex flex-col space-y-2 mt-10">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md hover:bg-[#5A3263] hover:text-white text-[14px] ${
                    isActive ? "bg-[#200c24]" : ""
                  }`
                }
                onClick={toggleMobileMenu}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
