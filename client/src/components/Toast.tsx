import { useNavigate } from "react-router-dom";
import { ShopItem } from "../hooks/useShopLogic";

interface ToastProps {
  product: ShopItem | null;
}

const Toast = ({ product }: ToastProps) => {
  const navigate = useNavigate();

  if (!product) return null;

  return (
    <div
      className="fixed top-[90px] right-[20px] bg-[#183855] text-white rounded-xl shadow-[0_6px_20px_rgba(0,0,0,0.25)] z-[1000] border-l-[6px] border-l-brandOrange flex items-center gap-[15px] p-[15px] max-w-[350px] cursor-pointer animate-[slideInOut_4.9s_ease-in-out_forwards]"
      onClick={() => navigate("/cart")}
    >
      <img
        src={`http://localhost:5001${product.image[0]}`}
        alt={product.name}
        className="w-[50px] h-[50px] rounded-lg object-cover border border-[#eee]"
      />
      <div className="flex flex-col">
        <p className="m-0 text-[0.85rem] font-medium">Added to kit:</p>
        <p className="text-brandOrange text-[1rem] font-bold underline mt-[2px] m-0">
          {product.name}
        </p>
      </div>
    </div>
  );
};

export default Toast;
