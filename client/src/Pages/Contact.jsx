import React, { useState } from "react";
import { FiRadio } from "react-icons/fi";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  // Success Message State
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Transmission Setup
      const response = await fetch("http://localhost:5001/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Payload Conversion
        body: JSON.stringify(formData),
      });

      // Awaiting Server Reply
      const data = await response.json();

      // Trigger the UI
      if (response.ok) {
        console.log("Server confirmed:", data.message);
        setIsSent(true);
        setFormData({
          name: "",
          email: "",
          subject: "General Inquiry",
          message: "",
        });

        setTimeout(() => {
          setIsSent(false);
        }, 5000);
      } else {
        console.error("Transmission rejected by server:", data);
      }
    } catch (error) {
      console.error("Fatal error: Could not reach basecamp.", error);
    }
  };

  return (
    <div className="max-w-[600px] mx-auto my-[60px] px-5 text-[#183855]">
      {/* Header */}
      <div className="relative flex justify-center mb-[10px]">
        {/* Tailwind Clip-Path Trapeze Background */}
        <div className="absolute inset-0 bg-brandOrange [clip-path:polygon(15%_0%,85%_0%,100%_100%,0%_100%)] z-[1] rounded-[4px]"></div>

        <h1 className="relative z-[2] m-0 py-[15px] px-[50px] text-white flex items-center justify-center gap-[12px] text-2xl font-bold">
          <FiRadio className="text-[1.5rem] animate-[pulse_2s_infinite]" />
          Establish Comms
        </h1>
      </div>
      <p className="text-center mb-[40px] font-bold text-brandOrange">
        Reach out to basecamp. We're standing by.
      </p>

      <form
        className="bg-[#f9f9f9] p-[30px] rounded-lg border-t-[6px] border-t-[#183855] shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col mb-[20px]">
          <label htmlFor="name" className="font-bold mb-[8px] text-[0.9rem]">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-[12px] border border-[#ccc] rounded-[4px] font-inherit text-[1rem] outline-none transition-colors duration-200 focus:border-brandOrange"
          />
        </div>

        <div className="flex flex-col mb-[20px]">
          <label htmlFor="email" className="font-bold mb-[8px] text-[0.9rem]">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-[12px] border border-[#ccc] rounded-[4px] font-inherit text-[1rem] outline-none transition-colors duration-200 focus:border-brandOrange"
          />
        </div>

        <div className="flex flex-col mb-[20px]">
          <label htmlFor="subject" className="font-bold mb-[8px] text-[0.9rem]">
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="p-[12px] border border-[#ccc] rounded-[4px] font-inherit text-[1rem] outline-none transition-colors duration-200 focus:border-brandOrange bg-white"
          >
            <option value="General Inquiry">General Inquiry</option>
            <option value="Item Question">Item Question</option>
            <option value="Returns & Exchanges">Returns & Exchanges</option>
            <option value="Deployment Support">Deployment Support</option>
          </select>
        </div>

        <div className="flex flex-col mb-[20px]">
          <label htmlFor="message" className="font-bold mb-[8px] text-[0.9rem]">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="p-[12px] border border-[#ccc] rounded-[4px] font-inherit text-[1rem] resize-y h-[120px] outline-none transition-colors duration-200 focus:border-brandOrange"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full p-[16px] bg-brandOrange text-white border-none rounded-[6px] text-[1.1rem] font-bold cursor-pointer transition-opacity duration-300 hover:opacity-80 flex justify-center items-center gap-[15px]"
        >
          <FiRadio className="text-[1.2rem]" /> Send Transmission{" "}
          <FiRadio className="text-[1.2rem]" />
        </button>
      </form>

      {/* Success Message */}
      {isSent && (
        <div className="mt-[25px] p-[20px] bg-[#e8f5e9] border-l-[5px] border-l-[#4caf50] text-[#2e7d32] rounded-[6px] font-bold flex items-center gap-[15px] animate-[slideInOutScale_5s_ease-in-out_forwards]">
          <FiRadio className="text-[1.5rem]" />
          Transmission sent to Haven Falls basecamp. We will get back to you
          within 3 working days.
        </div>
      )}
    </div>
  );
};

export default Contact;
