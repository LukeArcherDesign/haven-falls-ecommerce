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
    <footer className="border-t border-white pb-6 pt-10">
      <div className="flex justify-around px-5 py-2.5 flex-wrap gap-8">
        {/* Column 1: Shop */}
        <div className="flex flex-col items-center text-center">
          <h4 className="font-bold text-lg mb-[15px] text-white">Shop</h4>
          <p className="my-[5px] text-gray-300 cursor-pointer hover:text-brandOrange transition-colors duration-200">
            All Products
          </p>
          <p className="my-[5px] text-gray-300 cursor-pointer hover:text-brandOrange transition-colors duration-200">
            Best Sellers
          </p>
          <p className="my-[5px] text-gray-300 cursor-pointer hover:text-brandOrange transition-colors duration-200">
            New Arrivals
          </p>
        </div>

        {/* Column 2: Support */}
        <div className="flex flex-col items-center text-center">
          <h4 className="font-bold text-lg mb-[15px] text-white">Support</h4>
          <p className="my-[5px] text-gray-300 cursor-pointer hover:text-brandOrange transition-colors duration-200">
            Contact Us
          </p>
          <p className="my-[5px] text-gray-300 cursor-pointer hover:text-brandOrange transition-colors duration-200">
            FAQs
          </p>
          <p className="my-[5px] text-gray-300 cursor-pointer hover:text-brandOrange transition-colors duration-200">
            Shipping & Returns
          </p>
        </div>

        {/* Column 3: Legal */}
        <div className="flex flex-col items-center text-center">
          <h4 className="font-bold text-lg mb-[15px] text-white">Legal</h4>
          <p className="my-[5px] text-gray-300 cursor-pointer hover:text-brandOrange transition-colors duration-200">
            Terms of Service
          </p>
          <p className="my-[5px] text-gray-300 cursor-pointer hover:text-brandOrange transition-colors duration-200">
            Privacy Policy
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center mt-[30px] pt-[20px] border-t border-white/10 mx-auto max-w-4xl">
        <div className="flex justify-center gap-[15px] my-[15px]">
          <FaFacebook className="text-[1.4rem] text-brandOrange cursor-pointer hover:scale-110 transition-transform duration-200" />
          <FaInstagram className="text-[1.4rem] text-brandOrange cursor-pointer hover:scale-110 transition-transform duration-200" />
          <FaTiktok className="text-[1.4rem] text-brandOrange cursor-pointer hover:scale-110 transition-transform duration-200" />
        </div>

        <div className="flex justify-center gap-[10px] mb-[15px]">
          <FaCcVisa className="text-[1.8rem] text-white" />
          <FaCcMastercard className="text-[1.8rem] text-white" />
          <FaCcAmex className="text-[1.8rem] text-white" />
          <FaCcPaypal className="text-[1.8rem] text-white" />
          <FaApplePay className="text-[1.8rem] text-white" />
        </div>

        <p className="text-white text-sm">
          © 2026 Haven Falls. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
