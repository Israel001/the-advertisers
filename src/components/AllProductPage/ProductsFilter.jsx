import Checkbox from "../Helpers/Checkbox";

export default function ProductsFilter({
  filters,
  checkboxHandler,
  className,
  filterToggle,
}) {
  return (
    <>
      <div
        className={`filter-widget w-full fixed lg:relative left-0 top-0 h-screen z-10 lg:h-auto overflow-y-scroll lg:overflow-y-auto bg-white px-[30px] pt-[40px] ${
          className || ""
        }  ${filterToggle ? "block" : "hidden lg:block"}`}
      >
        <div className="filter-subject-item pb-10 border-b border-qgray-border">
          <div className="subject-title mb-[30px]">
            <h1 className="text-black text-base font-500">
              Product categories
            </h1>
          </div>
          <div className="filter-items">
            <ul>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="mobileLaptop"
                      name="mobileLaptop"
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.mobileLaptop}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="mobileLaptop"
                      className="text-xs font-black font-400 capitalize"
                    >
                      Mobile & Laptops
                    </label>
                  </div>
                </div>
              </li>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="gaming"
                      name="gaming"
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.gaming}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="gaming"
                      className="text-xs font-black font-400 capitalize"
                    >
                      Gaming Entertainment
                    </label>
                  </div>
                </div>
                <div>
                  <span className="cursor-pointer">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect y="4" width="10" height="2" fill="#C4C4C4" />
                      <rect
                        x="6"
                        width="10"
                        height="2"
                        transform="rotate(90 6 0)"
                        fill="#C4C4C4"
                      />
                    </svg>
                  </span>
                </div>
              </li>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="imageVideo"
                      name="imageVideo"
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.imageVideo}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="imageVideo"
                      className="text-xs font-black font-400 capitalize"
                    >
                      Image & Video
                    </label>
                  </div>
                </div>
                <div>
                  <span className="cursor-pointer">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect y="4" width="10" height="2" fill="#C4C4C4" />
                      <rect
                        x="6"
                        width="10"
                        height="2"
                        transform="rotate(90 6 0)"
                        fill="#C4C4C4"
                      />
                    </svg>
                  </span>
                </div>
              </li>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="vehicles"
                      name="vehicles"
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.vehicles}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="vehicles"
                      className="text-xs font-black font-400 capitalize"
                    >
                      Vehicles
                    </label>
                  </div>
                </div>
                <div>
                  <span className="cursor-pointer">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect y="4" width="10" height="2" fill="#C4C4C4" />
                      <rect
                        x="6"
                        width="10"
                        height="2"
                        transform="rotate(90 6 0)"
                        fill="#C4C4C4"
                      />
                    </svg>
                  </span>
                </div>
              </li>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="furnitures"
                      name="furnitures"
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.furnitures}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="furnitures"
                      className="text-xs font-black font-400 capitalize"
                    >
                      Furnitures
                    </label>
                  </div>
                </div>
                <div>
                  <span className="cursor-pointer">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect y="4" width="10" height="2" fill="#C4C4C4" />
                      <rect
                        x="6"
                        width="10"
                        height="2"
                        transform="rotate(90 6 0)"
                        fill="#C4C4C4"
                      />
                    </svg>
                  </span>
                </div>
              </li>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="sport"
                      name="sport"
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.sport}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="sport"
                      className="text-xs font-black font-400 capitalize"
                    >
                      Sport
                    </label>
                  </div>
                </div>
                <div>
                  <span className="cursor-pointer">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect y="4" width="10" height="2" fill="#C4C4C4" />
                      <rect
                        x="6"
                        width="10"
                        height="2"
                        transform="rotate(90 6 0)"
                        fill="#C4C4C4"
                      />
                    </svg>
                  </span>
                </div>
              </li>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="foodDrinks"
                      name="foodDrinks"
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.foodDrinks}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="foodDrinks"
                      className="text-xs font-black font-400 capitalize"
                    >
                      Food & Drinks
                    </label>
                  </div>
                </div>
                <div>
                  <span className="cursor-pointer">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect y="4" width="10" height="2" fill="#C4C4C4" />
                      <rect
                        x="6"
                        width="10"
                        height="2"
                        transform="rotate(90 6 0)"
                        fill="#C4C4C4"
                      />
                    </svg>
                  </span>
                </div>
              </li>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="fashion"
                      name="fashion"
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.fashion}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="fashion"
                      className="text-xs font-black font-400 capitalize"
                    >
                      Fashion Accessories
                    </label>
                  </div>
                </div>
                <div>
                  <span className="cursor-pointer">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect y="4" width="10" height="2" fill="#C4C4C4" />
                      <rect
                        x="6"
                        width="10"
                        height="2"
                        transform="rotate(90 6 0)"
                        fill="#C4C4C4"
                      />
                    </svg>
                  </span>
                </div>
              </li>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="toilet"
                      name="toilet"
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.toilet}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="toilet"
                      className="text-xs font-black font-400 capitalize"
                    >
                      Toilet & Sanitation
                    </label>
                  </div>
                </div>
                <div>
                  <span className="cursor-pointer">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect y="4" width="10" height="2" fill="#C4C4C4" />
                      <rect
                        x="6"
                        width="10"
                        height="2"
                        transform="rotate(90 6 0)"
                        fill="#C4C4C4"
                      />
                    </svg>
                  </span>
                </div>
              </li>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="makeupCorner"
                      name="makeupCorner"
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.makeupCorner}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="makeupCorner"
                      className="text-xs font-black font-400 capitalize"
                    >
                      Makeup Corner
                    </label>
                  </div>
                </div>
                <div>
                  <span className="cursor-pointer">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect y="4" width="10" height="2" fill="#C4C4C4" />
                      <rect
                        x="6"
                        width="10"
                        height="2"
                        transform="rotate(90 6 0)"
                        fill="#C4C4C4"
                      />
                    </svg>
                  </span>
                </div>
              </li>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="babyItem"
                      name="babyItem"
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters.babyItem}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="babyItem"
                      className="text-xs font-black font-400 capitalize"
                    >
                      Baby Items
                    </label>
                  </div>
                </div>
                <div>
                  <span className="cursor-pointer">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect y="4" width="10" height="2" fill="#C4C4C4" />
                      <rect
                        x="6"
                        width="10"
                        height="2"
                        transform="rotate(90 6 0)"
                        fill="#C4C4C4"
                      />
                    </svg>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
