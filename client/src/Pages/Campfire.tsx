import { Link } from "react-router-dom";
import { TbCampfire } from "react-icons/tb";
import { ShopItem } from "../hooks/useShopLogic";

interface CampfireProps {
  campfireList?: ShopItem[];
  toggleCampfire: (product: ShopItem) => void;
  addToKit: (product: ShopItem) => void;
}

const Campfire = ({
  campfireList = [],
  toggleCampfire,
  addToKit,
}: CampfireProps) => {
  return (
    <div className="max-w-[1200px] mx-auto my-[60px] px-5 text-center text-[#183855] min-h-[50vh]">
      {/* Trapeze Header - 15% Sharp Angle */}
      <div className="bg-brandOrange py-5 px-12 md:py-6 md:px-20 mb-[40px] shadow-[0_10px_25px_rgba(0,0,0,0.2)] [clip-path:polygon(15%_0%,85%_0%,100%_100%,0%_100%)] w-fit mx-auto relative z-10 rounded-[4px]">
        <h1 className="text-white text-2xl md:text-3xl m-0 flex items-center justify-center gap-[12px] uppercase tracking-wider">
          <TbCampfire className="text-[1.8rem]" /> Campfire
        </h1>
      </div>

      {campfireList.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-[80px] px-[20px] bg-[#f9f9f9] rounded-lg border-t-[6px] border-t-[#183855]">
          <TbCampfire className="text-[6rem] text-[#a0aab5] mb-[20px] opacity-30" />
          <h2 className="m-0 mb-[10px] text-[#183855] text-2xl font-bold">
            The fire is out.
          </h2>
          <p className="text-[#666] max-w-[400px] mb-[30px] leading-[1.5]">
            No items around the campfire. Select your favourite items in the
            field to see them here.
          </p>
          <Link
            to="/shop"
            className="px-[35px] py-[14px] bg-[#183855] text-white no-underline rounded-[6px] font-bold transition-opacity duration-300 hover:opacity-80"
          >
            Return to Field
          </Link>
        </div>
      ) : (
        /* Campfire Grid - Now using items-stretch */
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-[30px] items-stretch pt-[20px]">
          {campfireList.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-100 p-5 rounded-xl text-center flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)] w-full box-border h-full"
            >
              <div className="flex flex-col flex-grow">
                {/* Image Link */}
                <Link to={`/shop/${item.id}`} className="block relative">
                  <img
                    src={`http://localhost:5001${item.image[0]}`}
                    alt={item.name}
                    className="w-full h-[250px] object-contain block mb-[15px]"
                  />
                </Link>

                {/* Title */}
                <Link
                  to={`/shop/${item.id}`}
                  className="no-underline text-[#183855] hover:text-brandOrange transition-colors duration-200"
                >
                  <h3 className="m-0 text-[1.2rem] font-bold">{item.name}</h3>
                </Link>

                <p className="bg-brandOrange text-[#183855] px-[12px] py-[4px] rounded-full inline-block font-semibold text-[0.85rem] mx-auto my-[10px] w-fit">
                  {item.category}
                </p>
                <p className="text-brandOrange m-0 font-semibold text-[1.1rem] italic">
                  £{item.price.toFixed(2)}
                </p>
              </div>

              <div className="flex justify-between items-stretch gap-[10px] mt-auto pt-[15px]">
                <button
                  className="flex-grow bg-[#FABB05] text-[#183855] border-none py-[10px] px-[20px] rounded-[5px] font-bold cursor-pointer transition-colors duration-200 hover:bg-opacity-80"
                  onClick={() => addToKit(item)}
                >
                  Add to Kit
                </button>

                <button
                  className="campfire-btn lit"
                  onClick={() => toggleCampfire(item)}
                >
                  <TbCampfire className="flame-icon" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Campfire;
