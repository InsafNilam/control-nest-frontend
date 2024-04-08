import Error from "../assets/error.png";
import { Link } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <div className="min-h-screen pt-[60px] px-4 overflow-x-hidden">
      <div className="mt-[50px] mb-[10px] flex flex-col items-center justify-center">
        <img
          className="w-1/2 h-fit drop-shadow-[0_0_0.75rem_crimson] object-cover"
          src={Error}
        />
        <h2 className="text-blue-300">PAGE NOT FOUND</h2>
        <span>
          The page you are looking for might have been removed had its name
        </span>
        <span>changed or is temporarily unavailable.</span>
      </div>
      <div className="flex items-center justify-center">
        <Link to="/">
          <button className="items-center bg-white rounded-[48px] border-none shadow-[rgba(0,0,0,0.2)_0_3px_5px_-1px,rgba(0,0,0,0.14)_0_6px_10px_0,rgba(0,0,0,0.12)_0_1px_18px_0] text-white text-sm font-medium h-12 justify-center tracking-wide max-w-full px-1 py-6 relative text-center transition-[box-shadow_280ms_cubic-bezier(0.4,0,0.2,1),_opacity_15ms_linear_30ms,_transform_270ms_cubic-bezier(0,0,0.2,1)_0ms] w-auto hover:bg-[#f6f9fe] hover:text-white">
            Home Page
          </button>
        </Link>
      </div>
    </div>
  );
};
