import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TbCampfire } from "react-icons/tb";
import { FiShoppingBag, FiSettings } from "react-icons/fi";

const Account = ({ kitItems = [], campfireList = [] }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [currentName, setCurrentName] = useState("Loading...");
  const [newUsername, setNewUsername] = useState("");
  const [updateStatus, setUpdateStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("havenToken");
        if (!token) return;
        const response = await fetch("http://localhost:5001/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) setCurrentName(data.user.name);
      } catch (error) {
        setCurrentName("Adventurer");
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("havenToken");
    localStorage.removeItem("havenFallsCampfire");
    localStorage.removeItem("havenFallsKit");
    window.location.href = "/login";
  };

  const handleNameUpdate = async (e) => {
    e.preventDefault();
    if (!newUsername.trim()) return;
    setUpdateStatus("loading");
    try {
      const token = localStorage.getItem("havenToken");
      const response = await fetch(
        "http://localhost:5001/api/auth/profile/name",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ newName: newUsername }),
        },
      );
      if (response.ok) {
        setUpdateStatus("success");
        setStatusMessage("Name successfully updated!");
        setCurrentName(newUsername);
        setNewUsername("");
        setTimeout(() => {
          setIsEditing(false);
          setUpdateStatus("idle");
          setStatusMessage("");
        }, 1500);
      } else {
        setUpdateStatus("error");
        setStatusMessage("Failed to update.");
      }
    } catch (error) {
      setUpdateStatus("error");
      setStatusMessage("Server connection lost.");
    }
  };

  return (
    <section className="max-w-[800px] mx-auto my-[40px] px-5 min-h-[60vh] text-[#183855]">
      {/* Header */}
      <div className="bg-[#183855] p-[30px_20px] text-center [clip-path:polygon(5%_0%,100%_0%,95%_100%,0%_100%)] mb-[30px]">
        <h2 className="text-brandOrange m-0 font-bold tracking-wider text-[1.75rem]">
          Basecamp Command Center
        </h2>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[25px] mb-[30px]">
        {/* CAMPFIRE MODULE */}
        <div className="bg-white p-[30px_20px] rounded-lg text-center shadow-[0_4px_15px_rgba(0,0,0,0.05)] border-t-[4px] border-t-brandOrange transition-transform duration-200 hover:-translate-y-[5px]">
          <TbCampfire className="text-[2.5rem] text-[#183855] mb-[15px] mx-auto" />
          <h3 className="m-0 mb-[10px] text-[#183855] font-bold">
            Your Campfire
          </h3>
          <p className="text-[#666] mb-[20px] text-[0.95rem]">
            {campfireList.length} items saved
          </p>
          <Link
            to="/campfire"
            className="text-brandOrange font-semibold no-underline border-b-2 border-transparent hover:border-brandOrange transition-all"
          >
            View Campfire
          </Link>
        </div>

        {/* KIT MODULE */}
        <div className="bg-white p-[30px_20px] rounded-lg text-center shadow-[0_4px_15px_rgba(0,0,0,0.05)] border-t-[4px] border-t-brandOrange transition-transform duration-200 hover:-translate-y-[5px]">
          <FiShoppingBag className="text-[2.5rem] text-[#183855] mb-[15px] mx-auto" />
          <h3 className="m-0 mb-[10px] text-[#183855] font-bold">Your Kit</h3>
          <p className="text-[#666] mb-[20px] text-[0.95rem]">
            {kitItems.length} items packed
          </p>
          <Link
            to="/cart"
            className="text-brandOrange font-semibold no-underline border-b-2 border-transparent hover:border-brandOrange transition-all"
          >
            View Kit
          </Link>
        </div>

        {/* SETTINGS MODULE */}
        <div className="bg-white p-[30px_20px] rounded-lg text-center shadow-[0_4px_15px_rgba(0,0,0,0.05)] border-t-[4px] border-t-brandOrange transition-transform duration-200 hover:-translate-y-[5px]">
          <FiSettings className="text-[2.5rem] text-[#183855] mb-[15px] mx-auto" />
          <h3 className="m-0 mb-[10px] text-[#183855] font-bold">Settings</h3>

          {!isEditing ? (
            <div className="flex flex-col gap-[12px] items-center mt-[10px]">
              <p className="text-[1.05rem] text-[#333]">
                Name: <strong>{currentName}</strong>
              </p>
              <button
                className="bg-transparent border border-brandOrange text-brandOrange p-[6px_12px] rounded font-semibold cursor-pointer hover:bg-brandOrange hover:text-white transition-all"
                onClick={() => setIsEditing(true)}
              >
                Update Profile
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleNameUpdate}
              className="flex flex-col gap-[8px] mt-[10px] items-center"
            >
              <input
                type="text"
                placeholder="Enter new name..."
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="p-[8px_12px] border border-gray-300 rounded text-[#333]"
                autoFocus
              />
              <div className="flex gap-[8px] justify-center w-full">
                <button
                  type="submit"
                  className="p-[8px_12px] bg-brandOrange text-white border-none rounded font-bold cursor-pointer hover:opacity-80"
                  disabled={updateStatus === "loading"}
                >
                  {updateStatus === "loading" ? "Updating..." : "Save"}
                </button>
                <button
                  type="button"
                  className="p-[8px_12px] bg-gray-200 text-[#333] border-none rounded font-bold cursor-pointer"
                  onClick={() => {
                    setIsEditing(false);
                    setStatusMessage("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {statusMessage && (
            <p
              className={`text-[0.85rem] font-semibold mt-[5px] ${updateStatus === "success" ? "text-green-600" : "text-red-600"}`}
            >
              {statusMessage}
            </p>
          )}
        </div>
      </div>

      <div className="text-center mt-[40px]">
        {/* Pack Up & Log Out */}
        <button
          onClick={handleLogout}
          className="bg-brandOrange text-white p-[12px_24px] rounded font-bold cursor-pointer hover:bg-[#183855] transition-all border-none"
        >
          Pack Up & Log Out
        </button>
      </div>
    </section>
  );
};

export default Account;
