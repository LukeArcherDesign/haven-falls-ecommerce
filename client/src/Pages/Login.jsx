import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (statusMessage) setStatusMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("havenToken", data.token);

        try {
          const campfireResponse = await fetch(
            "http://localhost:5001/api/auth/campfire/sync",
            {
              method: "GET",
              headers: { Authorization: `Bearer ${data.token}` },
            },
          );

          if (campfireResponse.ok) {
            const campfireData = await campfireResponse.json();
            localStorage.setItem(
              "havenFallsCampfire",
              JSON.stringify(campfireData.campfireList),
            );
          }
        } catch (syncError) {
          console.error("Could not download campfire:", syncError);
        }

        setStatusMessage("Welcome back to basecamp.");
        setIsSuccess(true);
        setFormData({ email: "", password: "" });
        window.location.href = "/account";
      } else {
        setStatusMessage(data.message);
        setIsSuccess(false);
      }
    } catch (error) {
      setStatusMessage("Failed to connect to the server.");
      setIsSuccess(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] p-[20px]">
      {/* Box set to Navy, Border-white/10 adds subtle definition since page is also Navy */}
      <div className="bg-[#183855] text-white p-[40px] rounded-lg w-full max-w-[400px] text-center shadow-[0_10px_25px_rgba(0,0,0,0.2)] border border-white/10">
        <h2 className="text-brandOrange text-[1.5rem] m-0 mb-[10px] font-bold">
          Return to Basecamp
        </h2>
        <p className="text-white text-[1rem] m-0 mb-[25px]">
          Enter your credentials to access your kit.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-[15px] mt-[25px]"
        >
          <input
            type="email"
            name="email"
            placeholder="Adventurer Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-[12px] border border-gray-400 rounded-[4px] text-[1rem] text-[#333] outline-none focus:border-brandOrange"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="p-[12px] border border-gray-400 rounded-[4px] text-[1rem] text-[#333] outline-none focus:border-brandOrange"
          />
          <button
            type="submit"
            className="bg-brandOrange text-white py-[16px] px-[20px] text-[1.1rem] font-bold border-none rounded-[6px] cursor-pointer transition-opacity duration-300 hover:opacity-90"
          >
            Unlock Vault
          </button>
        </form>

        {statusMessage && (
          <div
            className={`mt-[20px] p-[12px] rounded-[4px] text-[0.95rem] font-bold animate-[fadeIn_0.3s_ease-in-out] ${
              isSuccess
                ? "bg-[rgba(46,204,113,0.1)] text-[#2ecc71] border border-[#2ecc71]"
                : "bg-[rgba(231,76,60,0.1)] text-[#ff9169] border border-[#ff9169]"
            }`}
          >
            {statusMessage}
          </div>
        )}

        <p className="mt-[20px] text-[0.9rem] text-white">
          New to Haven Falls?{" "}
          <Link
            to="/register"
            className="text-brandOrange no-underline font-bold hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
