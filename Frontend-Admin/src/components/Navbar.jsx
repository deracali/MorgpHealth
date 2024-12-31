import React, { useContext, useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets_frontend/assets';
import { AppContext } from '../context/AppContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  
  // State to manage dropdown visibility
  const [dropdownVisible, setDropdownVisible] = useState(false);
  
  // Create a ref for the dropdown
  const dropdownRef = useRef(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

  const logout = () => {
    setToken(false);
    localStorage.removeItem('utoken');
    localStorage.removeItem('insured');
    localStorage.removeItem('userId');
  };


  const handleLinkClick = () => {
    if (localStorage.getItem('insured') === 'true') {
      navigate('/contact'); // Redirect to contact page if insured
    }
  };

  
  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-between px-6 lg:px-12 py-4 border-b border-gray-200">
      {/* Logo */}
      <img
        onClick={() => navigate('/')}
        className="w-36 cursor-pointer"
        src={assets.MorgpLogo}
        alt="Logo"
      />

      {/* Desktop Navigation Links */}
      <ul className="hidden md:flex items-center gap-8 font-medium text-gray-700">
        <NavLink to="/" className="hover:text-blue-600 transition">
          HOME
        </NavLink>
        {userData ? (
        <NavLink
          to="/doctors"
          className="hover:text-blue-600 transition"
          onClick={handleLinkClick}
        >
          FIND A DOCTOR
        </NavLink>
      ) : (
        ''
      )}
        <NavLink to="/insurance" className="hover:text-blue-600 transition">
          INSURANCE
        </NavLink>
        <NavLink to="/about" className="hover:text-blue-600 transition">
          ABOUT US
        </NavLink>
        <NavLink to="/specialization" className="hover:text-blue-600 transition">
          SPECIALIZATION
        </NavLink>
        <NavLink to="/contact" className="hover:text-blue-600 transition">
          CONTACT US
        </NavLink>
      </ul>

      {/* Right Side - Buttons and User Menu */}
      <div className="relative">
        {/* Avatar with clickable dropdown */}
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group" onClick={toggleDropdown}>
            <img
              className="w-8 h-8 rounded-full"
              src={userData?.image}
              alt="User Profile"
            />
            <img
              className="w-2.5"
              src={assets.dropdown_icon}
              alt="Dropdown Icon"
            />
          </div>
        ) : (
          // Create account button with clickable dropdown
          <div className="group" onClick={toggleDropdown}>
            <button className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block">
              Create account
            </button>
          </div>
        )}

        {/* Dropdown content */}
        {dropdownVisible && (
          <div
            ref={dropdownRef}
            className="absolute right-0 top-full mt-2 w-48 bg-stone-100 rounded-md shadow-lg z-20"
          >
            <div className="py-2">
              {/* Dropdown items */}
              {token && userData ? (
                <>
                  <p
                    onClick={() => {
                      window.location.href = 'https://updatedpatient-dashboard.netlify.app/html/dashboard.html';
                      setDropdownVisible(false);  // Close the dropdown
                    }}
                    className="block px-4 py-2 text-gray-700 hover:text-black hover:bg-gray-100 cursor-pointer"
                  >
                    Dashboard
                  </p>
                  <p
                    onClick={() => {
                      navigate(`/my-appointments/${userData._id}`);
                      setDropdownVisible(false);  // Close the dropdown
                    }}
                    className="block px-4 py-2 text-gray-700 hover:text-black hover:bg-gray-100 cursor-pointer"
                  >
                    My Appointments
                  </p>
                  <p
                    onClick={() => {
                      logout();
                      setDropdownVisible(false);  // Close the dropdown
                    }}
                    className="block px-4 py-2 text-gray-700 hover:text-black hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </p>
                </>
              ) : (
                <>
                  <p
                    onClick={() => {
                      navigate('/login');
                      setDropdownVisible(false);  // Close the dropdown
                    }}
                    className="block px-4 py-2 text-gray-700 hover:text-black hover:bg-gray-100 cursor-pointer"
                  >
                    Patient
                  </p>
                  <p
                    onClick={() => {
                      window.location.href = 'https://updateddoctor-dashboard.netlify.app/';
                      setDropdownVisible(false);  // Close the dropdown
                    }}
                    className="block px-4 py-2 text-gray-700 hover:text-black hover:bg-gray-100 cursor-pointer"
                  >
                    Doctor
                  </p>
                  <p
                    onClick={() => {
                      navigate('/add-doc');
                      setDropdownVisible(false);  // Close the dropdown
                    }}
                    className="block px-4 py-2 text-gray-700 hover:text-black hover:bg-gray-100 cursor-pointer"
                  >
                    Register as a doctor
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <img
        onClick={() => setShowMenu(true)}
        className="w-6 md:hidden"
        src={assets.menu_icon}
        alt=""
      />

      {/* Mobile menu */}
      <div
        className={`${
          showMenu ? 'fixed w-full' : 'h-0 w-0 '
        } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
      >
        <div className="flex items-center justify-between px-5 py-6">
          <img className="w-36" src={assets.MorgpLogo} alt="" />
          <img
            className="w-7"
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
          <NavLink
            className="px-4 py-2 rounded inline-block"
            onClick={() => setShowMenu(false)}
            to="/"
          >
            <p className="px-4 py-2 rounded inline-block">HOME</p>
          </NavLink>
          {userData ? (
        <NavLink
          className="px-4 py-2 rounded inline-block"
          onClick={() => {
            setShowMenu(false);
            handleLinkClick(); // Check insurance status on click
          }}
          to="/doctors"
        >
          <p className="px-4 py-2 rounded inline-block">ALL DOCTORS</p>
        </NavLink>
      ) : (
        ''
      )}
          <NavLink
            className="px-4 py-2 rounded inline-block"
            onClick={() => setShowMenu(false)}
            to="/about"
          >
            <p className="px-4 py-2 rounded inline-block">ABOUT</p>
          </NavLink>
          <NavLink
            className="px-4 py-2 rounded inline-block"
            onClick={() => setShowMenu(false)}
            to="/specialization"
          >
            <p className="px-4 py-2 rounded inline-block">SPECIALIZATION</p>
          </NavLink>

          <NavLink
            className="px-4 py-2 rounded inline-block"
            onClick={() => setShowMenu(false)}
            to="/contact"
          >
            <p className="px-4 py-2 rounded inline-block">CONTACT</p>
          </NavLink>
        </ul>
      </div>
    </div>
  );
}
