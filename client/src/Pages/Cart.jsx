import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";

const Cart = ({ kitItems, updateQuantity, removeFromKit }) => {
  const total = kitItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const [deletingId, setDeletingId] = useState(null);

  const handleDeleteClick = (id) => {
    setDeletingId(id);

    setTimeout(() => {
      removeFromKit(id);
      setDeletingId(null);
    }, 400);
  };

  return (
    <div className="max-w-[1200px] mx-auto my-[60px] px-5 text-center text-[#183855]">
      {/* Tent Header */}
      <div className="bg-brandOrange py-5 px-12 md:py-6 md:px-20 mb-[40px] shadow-[0_10px_25px_rgba(0,0,0,0.2)] [clip-path:polygon(5%_0%,95%_0%,100%_100%,0%_100%)] w-fit mx-auto">
        <h1 className="text-[#183855] text-2xl md:text-4xl font-bold m-0 text-center uppercase tracking-wider">
          Your Field Kit
        </h1>
      </div>

      {kitItems.length === 0 ? (
        <p className="text-[1.2rem] mt-[50px]">
          Your kit is currently empty. Head to the Shop to gear up.
        </p>
      ) : (
        <div className="flex flex-wrap gap-[40px] text-left">
          {/* Left Column Styling */}
          <div className="flex-[2] flex flex-col gap-5 min-w-[300px]">
            {kitItems.map((item) => (
              /* Custom Deleting Class Maintained */
              <div
                key={item.id}
                className={`cart-item-row flex flex-wrap md:flex-nowrap items-center relative bg-white border border-[#eee] border-l-[6px] border-l-brandOrange rounded-lg p-[15px] shadow-[0_2px_8px_rgba(0,0,0,0.05)] overflow-hidden max-h-[200px] gap-5 pb-[20px] md:pb-[15px] ${
                  deletingId === item.id ? "deleting" : ""
                }`}
              >
                {/* DATABASE SYNC */}
                <img
                  src={`http://localhost:5001${item.image[0]}`}
                  alt={item.name}
                  className="w-[80px] h-[80px] object-cover rounded-[4px]"
                />

                <div className="flex-1 min-w-[130px]">
                  <h3 className="m-0 mb-[5px] text-[1.1rem] font-bold">
                    {item.name}
                  </h3>
                  <p className="text-[#888] m-0 text-[0.9rem]">
                    £{item.price.toFixed(2)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-[12px] md:ml-auto order-3 md:order-none mt-[15px] md:mt-0">
                  <button
                    className="bg-[#183855] text-white border-none w-[28px] h-[28px] rounded-[4px] cursor-pointer font-bold"
                    onClick={() => updateQuantity(item.id, -1)}
                    style={{
                      visibility: item.quantity > 1 ? "visible" : "hidden",
                    }}
                  >
                    -
                  </button>

                  <span className="font-bold min-w-[20px] text-center">
                    {item.quantity}
                  </span>

                  <button
                    className="bg-[#183855] text-white border-none w-[28px] h-[28px] rounded-[4px] cursor-pointer font-bold"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>

                {/* The Eraser Trigger Button */}
                <button
                  className="bg-transparent border-none text-[#999] text-[1.2rem] cursor-pointer p-[8px] flex items-center justify-center transition-colors duration-200 hover:text-brandOrange order-4 md:order-none mt-[15px] md:mt-0 ml-[15px] md:ml-0"
                  onClick={() => handleDeleteClick(item.id)}
                  title="Remove item from kit"
                  disabled={deletingId !== null}
                >
                  <FiTrash2 />
                </button>

                {/* Dynamic Item Total */}
                <div className="font-bold text-[1.1rem] min-w-[80px] text-right color-[#183855] order-5 md:order-none flex-1 md:flex-none mt-[15px] md:mt-0">
                  £{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column Styling (Checkout Panel) */}
          <div className="flex-1 bg-[#f9f9f9] p-[30px] rounded-lg h-fit min-w-[300px] border-t-[6px] border-t-[#183855]">
            <h3 className="m-0 text-[1.4rem] font-bold">Deployment Summary</h3>

            {/* Itemized Receipt */}
            <div className="border-b-[2px] border-b-[#ddd] pb-[15px] mb-[15px] mt-[20px]">
              {kitItems.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between mb-[10px] text-[#555] text-[0.95rem]"
                >
                  <span>
                    {item.quantity}x {item.name}
                  </span>
                  <span>£{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-[1.3rem] font-bold text-brandOrange mb-[10px]">
              <span>Total:</span>
              <span>£{total.toFixed(2)}</span>
            </div>

            <p className="text-[0.8rem] text-[#777] text-center mb-[25px]">
              Shipping & taxes calculated at checkout.
            </p>

            {/* Order Note */}
            <div className="flex flex-col mb-[25px]">
              <label className="text-[0.85rem] font-bold mb-[8px]">
                Add deployment note:
              </label>
              <textarea
                placeholder="Special instructions..."
                className="p-[10px] border border-[#ccc] rounded-[4px] resize-y h-[60px] font-inherit"
              ></textarea>
            </div>

            <button className="w-full p-[16px] bg-brandOrange text-white border-none rounded-[6px] text-[1.1rem] font-bold cursor-pointer transition-opacity duration-300 hover:opacity-80">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
