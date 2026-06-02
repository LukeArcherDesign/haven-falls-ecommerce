import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/HavenFalls-logo.png";
import { FiUser, FiShoppingBag, FiMenu, FiX } from "react-icons/fi";
import { TbCampfire } from "react-icons/tb";

interface NavbarProps {
  kitItems?: any[]; // An array of items (make 'any' stricter later)
  campfireList?: any[];
  closeToast: () => void;
}

const Navbar = ({
  kitItems = [],
  campfireList = [],
  closeToast,
}: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);

  const isLoggedIn = !!localStorage.getItem("havenToken");
  const profileRoute = isLoggedIn ? "/account" : "/login";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Shop", path: "/shop" },
    { name: "Contact", path: "/contact" },
  ];

  const currentPath = useRef(location.pathname);
  useEffect(() => {
    if (currentPath.current !== location.pathname) {
      if (closeToast) closeToast();
      setIsMobileMenuOpen(false);
      currentPath.current = location.pathname;
    }
  }, [location.pathname, closeToast]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav
      className="flex justify-between items-center px-4 py-3 md:px-20 md:py-6 h-[60px] md:h-auto bg-[#183855] shadow-[0_4px_20px_rgba(0,0,0,0.3)] relative z-[100]"
      ref={navRef}
    >
      {/* LOGO */}
      <Link to="/" className="flex items-center">
        <img
          src={logo}
          alt="Haven Falls Logo"
          className="h-[35px] md:h-[65px] cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </Link>

      {/* DESKTOP LINKS */}
      <div className="hidden md:flex gap-8 text-white">
        {navLinks.map((menuItem) => (
          <Link
            key={menuItem.name}
            to={menuItem.path}
            className="cursor-pointer transition-colors duration-300 ease hover:text-brandOrange flex items-center"
          >
            {menuItem.name}
          </Link>
        ))}
      </div>

      {/* ACTIONS (ICONS) */}
      <div className="flex gap-5 items-center">
        {/* Campfire Icon */}
        <Link
          to="/campfire"
          className="relative flex items-center cursor-pointer text-brandOrange"
        >
          <TbCampfire className="text-[1.4rem] transition-all duration-300 ease hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(244,162,97,0.8)]" />
          {campfireList.length > 0 && (
            <span className="absolute -bottom-1 -right-2 bg-brandOrange text-white text-[0.7rem] font-bold h-[18px] w-[18px] rounded-full flex justify-center items-center p-0">
              {campfireList.length}
            </span>
          )}
        </Link>

        {/* Profile Icon (Desktop Only) */}
        <Link
          to={profileRoute}
          className="hidden md:flex items-center cursor-pointer text-brandOrange"
        >
          <FiUser className="text-[1.4rem] transition-all duration-300 ease hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(244,162,97,0.8)]" />
        </Link>

        {/* Cart Icon */}
        <Link
          to="/cart"
          className="relative flex items-center cursor-pointer text-brandOrange"
        >
          <FiShoppingBag className="text-[1.4rem] transition-all duration-300 ease hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(244,162,97,0.8)]" />
          {kitItems.length > 0 && (
            <span className="absolute -bottom-1 -right-2 bg-brandOrange text-white text-[0.7rem] font-bold h-[18px] w-[18px] rounded-full flex justify-center items-center p-0">
              {kitItems.length}
            </span>
          )}
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="block md:hidden text-brandOrange cursor-pointer focus:outline-none"
          onClick={() => {
            const nextState = !isMobileMenuOpen;
            setIsMobileMenuOpen(nextState);
            if (nextState && closeToast) closeToast();
          }}
        >
          {isMobileMenuOpen ? (
            <FiX className="text-[1.4rem] transition-all duration-300 ease hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(244,162,97,0.8)]" />
          ) : (
            <FiMenu className="text-[1.4rem] transition-all duration-300 ease hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(244,162,97,0.8)]" />
          )}
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      <div
        className={`fixed top-[60px] w-[250px] bg-[#183855] flex flex-col p-6 gap-6 shadow-[-4px_4px_15px_rgba(0,0,0,0.4)] z-[100] transition-[right] duration-[400ms] ease-in-out md:hidden ${
          isMobileMenuOpen ? "right-0" : "-right-[250px]"
        }`}
      >
        {navLinks.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white text-[1.2rem] flex items-center gap-[10px]"
          >
            {item.name}
          </Link>
        ))}

        <hr className="border-[rgba(255,145,105,0.3)] my-2" />
        <Link
          to={profileRoute}
          className="flex items-center gap-[15px] text-white text-[1.2rem] no-underline"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <FiUser /> <span>Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
