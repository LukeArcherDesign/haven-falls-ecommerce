import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/HavenFalls-logo.png";
import { FiSearch, FiUser, FiShoppingBag, FiMenu, FiX } from "react-icons/fi";
import { TbCampfire } from "react-icons/tb";

const Navbar = ({ kitItems = [], campfireList = [] }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const location = useLocation();
  const navRef = useRef(null); 

  const isLoggedIn = !!localStorage.getItem("havenToken");
  const profileRoute = isLoggedIn ? "/account" : "/login";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Shop", path: "/shop" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
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
    <nav className="navbar" ref={navRef}>
      <Link to="/" className="logo">
        <img src={logo} alt="Haven Falls Logo" className="logo-img" />
      </Link>

      <div className="links">
        {navLinks.map((menuItem) => (
          <Link key={menuItem.name} to={menuItem.path}>
            {menuItem.name}
          </Link>
        ))}
      </div>

      {/* NAVBAR ICONS*/}
      <div className="actions">
        <Link to="/campfire" className="cart-icon-container">
          <TbCampfire className="nav-icon" />
          {campfireList.length > 0 && (
            <span className="cart-badge">{campfireList.length}</span>
          )}
        </Link>

        <Link to={profileRoute} className="desktop-only">
          <FiUser className="nav-icon" />
        </Link>

        <Link to="/cart" className="cart-icon-container">
          <FiShoppingBag className="nav-icon" />
          {kitItems.length > 0 && (
            <span className="cart-badge">{kitItems.length}</span>
          )}
        </Link>

        <div
          className="mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <FiX className="nav-icon" />
          ) : (
            <FiMenu className="nav-icon" />
          )}
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      <div className={isMobileMenuOpen ? "mobile-menu open" : "mobile-menu"}>
        {navLinks.map((item) => (
          <Link key={item.name} to={item.path}>
            {item.name}
          </Link>
        ))}

        <hr />
        <Link to={profileRoute} className="mobile-profile-link">
          <FiUser /> <span>Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;