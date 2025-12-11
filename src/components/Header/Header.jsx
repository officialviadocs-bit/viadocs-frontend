import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import logo from "../../assets/logo.png"; // ✅ Use .webp for smaller size

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Verify login state
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:5000/api/auth/verify", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.loggedIn) {
          setIsLoggedIn(true);
          setUserName(data.user?.firstName || "User");
        } else {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        }
      })
      .catch(() => setIsLoggedIn(false));
  }, []);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserName("");
    setMenuOpen(false);
    navigate("/", { replace: true });
  };

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 z-50 flex items-center justify-between w-full px-4 py-2 sm:px-8 sm:py-3 bg-gradient-to-br from-[#2F3438] via-[#373C3F] to-[#3F4448] shadow-md"
    >
      {/* ---------- Left Section: Logo + Title ---------- */}
      <div
        className="flex items-center gap-3 text-white cursor-pointer select-none"
        onClick={() => navigate("/")}
        aria-label="Navigate to Home"
      >
        <img
          src={logo}
          alt="Viadocs Logo"
          loading="lazy"
          decoding="async"
          width="48"
          height="48"
          className="object-contain w-8 h-8 sm:w-12 sm:h-12 rounded-full shadow-md hover:scale-105 transition-transform duration-300"
        />
        <span className="text-lg font-bold tracking-wide sm:text-2xl text-white">
          VIADOCS
        </span>
      </div>

      {/* ---------- Right Section ---------- */}
      <div className="flex items-center gap-4 sm:gap-6">
        {!isLoggedIn ? (
          <button
            onClick={() => navigate("/login")}
            aria-label="Login or Signup"
            className="flex items-center gap-2 px-3 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm font-semibold text-white bg-transparent border border-white/20 rounded-full group hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all focus:outline-none"
          >
            <FaUserCircle className="text-base sm:text-2xl text-white group-hover:text-black transition-colors" />
            <span className="whitespace-nowrap">Login / Signup</span>
          </button>
        ) : (
          <div className="relative" ref={menuRef}>
            <button
              className="flex items-center gap-2 text-sm font-medium text-white hover:text-gray-300 transition-colors"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Open Profile Menu"
            >
              <FaUserCircle className="text-xl sm:text-2xl text-white" />
              <span className="truncate max-w-[100px] sm:max-w-none">{userName}</span>
            </button>

            {menuOpen && (
              <div
                className="absolute right-0 z-10 mt-2 bg-white border border-gray-200 
                           rounded-lg shadow-lg w-40 animate-fadeIn"
              >
                <button
                  onClick={() => {
                    navigate("/profile");
                    setMenuOpen(false);
                  }}
                  className="flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <FaUserCircle className="text-black" />
                  <span>My Profile</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center w-full gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <FaSignOutAlt className="text-black" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default React.memo(Header);