import { useState, useEffect } from "react";
import ThinLove from "../../Helpers/icons/ThinLove";
import ThinPeople from "../../Helpers/icons/ThinPeople";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchBox from "../../Helpers/SearchBox";
import { useAppContext } from "../../../contexts";

export default function Drawer({ className, open, action, type }) {
  const [tab, setTab] = useState("category");
  const [categories, setCategories] = useState([]);
  const { isLoggedIn, profile } = useAppContext();

  const fetchCategories = async () => {
    const response = await axios.get(
      `${
        import.meta.env.VITE_HOST_URL
      }/category?pagination[page]=1&pagination[limit]=15`
    );
    setCategories(response.data.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div
        className={`drawer-wrapper w-full  h-full relative block lg:hidden  ${
          className || ""
        }`}
      >
        {open && (
          <div
            onClick={action}
            className="w-full h-screen bg-black bg-opacity-40 z-40 left-0 top-0 fixed"
          ></div>
        )}
        <div
          className={`w-[280px] transition-all duration-300 ease-in-out h-screen overflow-y-auto overflow-x-hidden overflow-style-none bg-white fixed top-0 z-50 ${
            open ? "left-0" : "-left-[280px]"
          }`}
        >
          <div className="w-full px-5 mt-5 mb-4">
            <div className="flex justify-between items-center">
              <div className="flex space-x-5 items-center">
                <div>
                  <Link to={isLoggedIn ? "/profile" : "/login"}>
                    <span>
                      <ThinPeople />
                    </span>
                  </Link>
                </div>
                <div className="favorite relative">
                  <Link to={isLoggedIn ? "/wishlist" : "/login"}>
                    <span>
                      <ThinLove />
                    </span>
                  </Link>
                  {isLoggedIn && profile?.wishlist?.length > 0 && (
                    <span
                      className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] ${
                        type === 3 ? "bg-qh3-blue text-white" : "bg-qyellow"
                      }`}
                      style={{ color: "white" }}
                    >
                      {profile.wishlist.length}
                    </span>
                  )}
                </div>
              </div>
              <button onClick={action} type="button">
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.0363 33.9994C7.66923 34.031 0.0436412 26.4423 0.000545718 17.0452C-0.0425497 7.68436 7.54917 0.0479251 16.9447 0.00021656C26.3072 -0.0467224 33.9505 7.54277 33.9998 16.9352C34.0483 26.3153 26.4411 33.9679 17.0363 33.9994Z"
                    fill="black"
                  />
                  <path
                    d="M17.0363 33.9994C26.4411 33.9679 34.0483 26.3153 33.9998 16.9352C33.9505 7.54277 26.3072 -0.0467224 16.9447 0.00021656C7.54917 0.0479251 -0.0425497 7.68436 0.000545718 17.0452C0.0436412 26.4423 7.66846 34.031 17.0363 33.9994ZM23.4629 21.5945C23.4514 21.8445 23.3321 22.0908 23.1305 22.3039C22.7865 22.6671 22.4479 23.0342 22.1039 23.3966C21.5236 24.0084 21.1458 24.0068 20.5648 23.3889C19.4581 22.2124 18.3492 21.0389 17.2533 19.8523C17.0633 19.6461 16.9686 19.6169 16.7608 19.8431C15.6511 21.0512 14.5222 22.2424 13.3978 23.4366C12.8753 23.9914 12.4697 23.9891 11.9388 23.4312C11.6032 23.0788 11.2715 22.7218 10.9399 22.3647C10.4089 21.7938 10.4081 21.3575 10.9376 20.7927C12.0503 19.6046 13.1593 18.4126 14.2836 17.2361C14.4822 17.0283 14.5037 16.9152 14.2921 16.6943C13.1654 15.5193 12.058 14.3266 10.9452 13.1385C10.4004 12.556 10.4042 12.1259 10.9545 11.5387C11.2785 11.1925 11.6009 10.8447 11.9272 10.5007C12.4821 9.91666 12.8822 9.92358 13.4417 10.5192C14.5468 11.6965 15.6588 12.8677 16.7516 14.0573C16.9671 14.2912 17.071 14.2651 17.271 14.0473C18.3831 12.8415 19.5082 11.6472 20.6363 10.4561C21.1273 9.93743 21.5521 9.94359 22.0469 10.4576C22.3848 10.8085 22.7157 11.1655 23.0474 11.5226C23.6115 12.1289 23.6122 12.5552 23.052 13.1539C21.9477 14.3328 20.8503 15.517 19.7321 16.6828C19.5058 16.9183 19.5382 17.0391 19.7475 17.2584C20.8641 18.4249 21.9623 19.6092 23.0681 20.7865C23.2721 21.002 23.456 21.229 23.4629 21.5945Z"
                    fill="#FE4949"
                  />
                  <path
                    d="M23.4614 21.5947C23.4545 21.2292 23.2706 21.0022 23.0659 20.7844C21.9608 19.6071 20.8619 18.4228 19.7452 17.2563C19.5359 17.0377 19.5036 16.9169 19.7298 16.6807C20.848 15.5157 21.9454 14.3307 23.0497 13.1518C23.61 12.5539 23.6084 12.1276 23.0451 11.5205C22.7134 11.1635 22.3825 10.8064 22.0447 10.4555C21.5498 9.9415 21.125 9.93611 20.6341 10.454C19.5059 11.6452 18.3808 12.8394 17.2688 14.0452C17.0679 14.263 16.964 14.2891 16.7493 14.0552C15.6565 12.8663 14.5445 11.6952 13.4394 10.5171C12.88 9.92149 12.4798 9.91456 11.9249 10.4986C11.5979 10.8426 11.2762 11.1904 10.9522 11.5367C10.402 12.1238 10.3981 12.5547 10.943 13.1364C12.0558 14.3245 13.1632 15.5172 14.2898 16.6922C14.5014 16.9131 14.4799 17.0254 14.2813 17.234C13.157 18.4113 12.0481 19.6025 10.9353 20.7906C10.4058 21.3561 10.4074 21.7917 10.9376 22.3626C11.2693 22.7197 11.601 23.076 11.9365 23.4291C12.4675 23.987 12.873 23.9893 13.3956 23.4345C14.5207 22.2403 15.6488 21.0491 16.7586 19.841C16.9671 19.614 17.061 19.644 17.2511 19.8502C18.3469 21.0368 19.4559 22.2103 20.5625 23.3868C21.1435 24.0047 21.5214 24.0063 22.1016 23.3945C22.4456 23.0321 22.7842 22.6643 23.1282 22.3018C23.3306 22.091 23.4507 21.8448 23.4614 21.5947Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="w-full mt-5 px-5">
            <div className="search-bar w-full h-[34px]  flex ">
              <SearchBox type={type} className="search-com" />
            </div>
          </div>
          <div className="w-full mt-5 px-5 flex items-center space-x-3">
            <span
              onClick={() => setTab("category")}
              className={`text-base font-semibold cursor-pointer  ${
                tab === "category" ? "text-qblack" : "text-qgray"
              }`}
            >
              Categories
            </span>
            <span className="w-[1px] h-[14px] bg-qgray"></span>
            <span
              onClick={() => setTab("menu")}
              className={`text-base font-semibold cursor-pointer ${
                tab === "menu" ? "text-qblack" : "text-qgray "
              }`}
            >
              Arrivals
            </span>
          </div>
          {tab === "category" ? (
            <div className="category-item mt-5 w-full">
              <ul className="categories-list">
                {categories?.map((category) => {
                  return (
                    <li className="category-item" key={category.id}>
                      <Link to={`/all-products?mainCategoryId=${category.id}`}>
                        <div
                          className={`flex justify-between items-center px-5 h-10 bg-white  transition-all duration-300 ease-in-out cursor-pointer text-qblack hover:bg-red-600 hover:duration-500`}
                        >
                          <div className="flex items-center space-x-6">
                            <span>
                              <svg
                                className="fill-current"
                                width="12"
                                height="16"
                                viewBox="0 0 12 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M0.911344 0.0514231C0.633547 0.132053 0.157324 0.565442 0.0722839 0.822452C-0.0240946 1.12481 -0.0240946 14.8132 0.0722839 15.1156C0.162993 15.3928 0.633547 15.811 0.94536 15.8917C1.10977 15.932 1.72773 15.9521 2.94663 15.9521H4.71546L4.85152 15.8262C5.03861 15.6649 5.03861 15.4331 4.85152 15.2718L4.71546 15.1458H2.9523H1.18914L1.05308 15.0199L0.911344 14.8989V8.85526V1.03914L1.05308 0.9182L1.18914 0.792214H5.90035H10.6116L10.7476 0.9182L10.8894 1.03914V8.85526V14.8989L10.7476 15.0199L10.6116 15.1458H8.8484H7.08524L6.94917 15.2718C6.76208 15.4331 6.76208 15.6649 6.94917 15.8262L7.08524 15.9521H8.85406C10.073 15.9521 10.6909 15.932 10.8553 15.8917C11.1842 15.806 11.6377 15.3877 11.7284 15.0955C11.7851 14.9191 11.7964 14.8673 11.7851 8.72423L11.7681 0.807333L11.598 0.560402C11.4903 0.409221 11.3202 0.258039 11.1501 0.16229L10.8723 0.0111084L5.99106 0.00102901C2.53844 -0.0040102 1.05308 0.0111074 0.911344 0.0514231Z" />
                                <path d="M1.96009 1.72447C1.86938 1.80006 1.81836 1.90588 1.81836 2.00163C1.81836 2.09738 1.86938 2.20321 1.96009 2.2788C2.09049 2.39975 2.13584 2.40479 2.72545 2.40479C3.31506 2.40479 3.36042 2.39975 3.49081 2.2788C3.58152 2.20321 3.63254 2.09738 3.63254 2.00163C3.63254 1.90588 3.58152 1.80006 3.49081 1.72447C3.36042 1.60352 3.31506 1.59848 2.72545 1.59848C2.13584 1.59848 2.09049 1.60352 1.96009 1.72447Z" />
                                <path d="M8.16214 1.66399C7.83899 1.76981 7.61221 1.93611 7.4478 2.19312C7.31174 2.3947 7.28906 2.48541 7.28906 2.81297C7.28906 3.15061 7.31174 3.22116 7.45914 3.44289C7.56686 3.59407 7.73694 3.74526 7.90702 3.84101C8.15647 3.97707 8.23584 3.99219 8.62135 3.99219C9.00687 3.99219 9.08624 3.97707 9.33569 3.84101C9.50577 3.74526 9.67585 3.59407 9.78357 3.44289C9.93664 3.22116 9.95364 3.15061 9.95364 2.80793C9.95364 2.46525 9.93664 2.3947 9.78357 2.17296C9.54545 1.83029 9.18829 1.64383 8.7234 1.61863C8.50797 1.60351 8.28686 1.62367 8.16214 1.66399ZM8.93317 2.53076C9.02388 2.60635 9.0749 2.71218 9.0749 2.80793C9.0749 2.90368 9.02388 3.0095 8.93317 3.0851C8.84813 3.16573 8.72907 3.21108 8.62135 3.21108C8.51364 3.21108 8.39458 3.16573 8.30954 3.0851C8.21883 3.0095 8.16781 2.90368 8.16781 2.80793C8.16781 2.71218 8.21883 2.60635 8.30954 2.53076C8.39458 2.45013 8.51364 2.40478 8.62135 2.40478C8.72907 2.40478 8.84813 2.45013 8.93317 2.53076Z" />
                                <path d="M1.96009 3.33677C1.86938 3.41236 1.81836 3.51819 1.81836 3.61394C1.81836 3.70969 1.86938 3.81551 1.96009 3.8911C2.09049 4.01205 2.13584 4.01709 2.72545 4.01709C3.31506 4.01709 3.36042 4.01205 3.49081 3.8911C3.58152 3.81551 3.63254 3.70969 3.63254 3.61394C3.63254 3.51819 3.58152 3.41236 3.49081 3.33677C3.36042 3.21583 3.31506 3.21079 2.72545 3.21079C2.13584 3.21079 2.09049 3.21583 1.96009 3.33677Z" />
                                <path d="M1.96009 4.94908C1.86938 5.02467 1.81836 5.13049 1.81836 5.22624C1.81836 5.32199 1.86938 5.42782 1.96009 5.50341C2.09049 5.62436 2.13584 5.62939 2.72545 5.62939C3.31506 5.62939 3.36042 5.62436 3.49081 5.50341C3.58152 5.42782 3.63254 5.32199 3.63254 5.22624C3.63254 5.13049 3.58152 5.02467 3.49081 4.94908C3.36042 4.82813 3.31506 4.82309 2.72545 4.82309C2.13584 4.82309 2.09049 4.82813 1.96009 4.94908Z" />
                                <path d="M1.96009 6.56187C1.86938 6.63746 1.81836 6.74329 1.81836 6.83904C1.81836 6.93478 1.86938 7.04061 1.96009 7.1162C2.09049 7.23715 2.13584 7.24219 2.72545 7.24219C3.31506 7.24219 3.36042 7.23715 3.49081 7.1162C3.58152 7.04061 3.63254 6.93478 3.63254 6.83904C3.63254 6.74329 3.58152 6.63746 3.49081 6.56187C3.36042 6.44092 3.31506 6.43588 2.72545 6.43588C2.13584 6.43588 2.09049 6.44092 1.96009 6.56187Z" />
                                <path d="M6.03052 7.19834C4.31271 8.72024 4.08594 8.94197 4.08594 9.07804C4.08594 9.17379 4.13696 9.28465 4.22767 9.37032L4.36373 9.50135H5.71303H7.05666L5.5713 10.8267C4.27303 11.9807 4.08594 12.1722 4.08594 12.3083C4.08594 12.5149 4.32405 12.7266 4.56216 12.7266C4.71523 12.7266 4.96468 12.5199 6.67682 10.998C8.80848 9.10324 8.79148 9.12339 8.47966 8.82607L8.3436 8.69504H6.9943H5.65067L7.13603 7.36968C8.42297 6.21566 8.6214 6.01912 8.6214 5.8881C8.6214 5.68148 8.38328 5.46983 8.14517 5.46983C7.9921 5.46983 7.74265 5.6714 6.03052 7.19834Z" />
                                <path d="M5.589 15.2714C5.49829 15.347 5.44727 15.4528 5.44727 15.5486C5.44727 15.6443 5.49829 15.7502 5.589 15.8257C5.8668 16.0777 6.35436 15.9013 6.35436 15.5486C6.35436 15.342 6.13325 15.1454 5.90081 15.1454C5.79309 15.1454 5.67404 15.1908 5.589 15.2714Z" />
                              </svg>
                            </span>
                            <span className="text-xs font-400">
                              {category.name}
                            </span>
                          </div>
                          <div>
                            <span>
                              <svg
                                className="fill-current"
                                width="6"
                                height="9"
                                viewBox="0 0 6 9"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  x="1.49805"
                                  y="0.818359"
                                  width="5.78538"
                                  height="1.28564"
                                  transform="rotate(45 1.49805 0.818359)"
                                />
                                <rect
                                  x="5.58984"
                                  y="4.90918"
                                  width="5.78538"
                                  height="1.28564"
                                  transform="rotate(135 5.58984 4.90918)"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <div className="menu-item mt-5 w-full">
              <ul></ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
