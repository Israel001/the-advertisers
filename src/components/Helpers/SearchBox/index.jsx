import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBox({ className, type }) {
  const [searchValue, setSearchValue] = useState();
  const navigate = useNavigate();

  return (
    <>
    
      <div
        className={`w-full h-full flex items-center ${
          className || ""
        }`}
      >
        <div className="flex-1 h-full">
          <form
            action="#"
            className="h-full"
            onSubmit={(event) => {
              event.preventDefault();
              navigate(`/all-products?search=${searchValue}`);
            }}
          >
            <input
              type="text"
              className="search-input"
              placeholder="Search Product..."
              value={searchValue}
              style={{borderTopLeftRadius:"10px", borderBottomLeftRadius:"10px"}}
              onChange={(event) => setSearchValue(event.target.value)}
            />
          </form>
        </div>
        <button
          className={` w-[93px] h-full text-sm font-600  ${
            type === 3 ? "bg-qh3-blue text-white" : "search-btn"
          }`}
          type="button"
          style={{
            background:"black",
            borderTopRightRadius:"10px",
            borderBottomRightRadius:"10px",
            // background: "rgb(185 28 28 / 1)",
            color: "white",
          }}
          onClick={() => {
            navigate(`/all-products?search=${searchValue}`);
          }}
        >
          Search
        </button>
      </div>
    </>
  );
}
