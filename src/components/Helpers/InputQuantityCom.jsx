/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useAppContext } from "../../contexts";

export default function InputQuantityCom({ item }) {
  const [quantity, setQuantity] = useState(1);
  const { updateCartQty } = useAppContext();

  const increment = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  useEffect(() => {
    updateCartQty(item, quantity);
  }, [quantity]);

  return (
    <div className="w-[120px] h-[40px] px-[26px] flex items-center border border-qgray-border">
      <div className="flex justify-between items-center w-full">
        <button
          onClick={decrement}
          type="button"
          className="text-base text-qgray"
        >
          -
        </button>
        <span className="text-qblack">{item?.quantity}</span>
        <button
          onClick={increment}
          type="button"
          className="text-base text-qgray"
        >
          +
        </button>
      </div>
    </div>
  );
}
