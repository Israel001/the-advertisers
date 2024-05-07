/* eslint-disable react/prop-types */
import { useState } from "react";
import { useAppContext } from "../../contexts";

export default function InputQuantityCom({ item }) {
  const [quantity, setQuantity] = useState(item?.quantity);
  const { updateCartQty } = useAppContext();

  return (
    <div className="w-[120px] h-[40px] px-[26px] flex items-center border border-qgray-border">
      <div className="flex justify-between items-center w-full">
        <button
          onClick={() => {
            if (quantity > 1) {
              updateCartQty(item, quantity - 1);
              setQuantity(quantity - 1);
            }
          }}
          type="button"
          className="text-base text-qgray"
        >
          -
        </button>
        <span className="text-qblack">{item?.quantity}</span>
        <button
          onClick={() => {
            updateCartQty(item, quantity + 1);
            setQuantity(quantity + 1);
          }}
          type="button"
          className="text-base text-qgray"
        >
          +
        </button>
      </div>
    </div>
  );
}
