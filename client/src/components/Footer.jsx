import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaApplePay,
  FaCcAmex,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-columns">
        {/* Column 1: Shop */}
        <div className="footer-column">
          <h4>Shop</h4>
          <p>All Products</p>
          <p>Best Sellers</p>
          <p>New Arrivals</p>
        </div>

        {/* Column 2: Support */}
        <div className="footer-column">
          <h4>Support</h4>
          <p>Contact Us</p>
          <p>FAQs</p>
          <p>Shipping & Returns</p>
        </div>

        {/* Column 3: Legal */}
        <div className="footer-column">
          <h4>Legal</h4>
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="social-icons">
          <FaFacebook />
          <FaInstagram />
          <FaTiktok />
        </div>

        <div className="payment-icons">
          <FaCcVisa />
          <FaCcMastercard />
          <FaCcAmex />
          <FaCcPaypal />
          <FaApplePay />
        </div>

        <p>© 2026 Haven Falls. All rights reserved.</p>
        
      </div>
    </footer>
  );
};

export default Footer;
