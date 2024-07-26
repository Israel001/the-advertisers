/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useAppContext } from "../../contexts";

export default function InputQuantityCom({ item }) {
  const [quantity, setQuantity] = useState(item?.quantity);
  const { updateCartQty, removeFromCart } = useAppContext();

  useEffect(() => {
    setQuantity(item?.quantity);
  }, [item?.quantity]);

  const handleDecrement = () => {
    if (quantity > 1) {
      updateCartQty(item, quantity - 1);
      setQuantity(quantity - 1);
    } else if (quantity === 1) {
      removeFromCart(item);
      setQuantity(0);
    }
  };

  const handleIncrement = () => {
    updateCartQty(item, quantity + 1);
    setQuantity(quantity + 1);
  };

  return (
    <div className="w-[120px] h-[40px] px-[26px] flex items-center border border-qgray-border">
      <div className="flex justify-between items-center w-full">
        <button
          onClick={handleDecrement}
          type="button"
          className="text-base text-qgray"
        >
          -
        </button>
        <span className="text-qblack">{quantity}</span>
        <button
          onClick={handleIncrement}
          type="button"
          className="text-base text-qgray"
        >
          +
        </button>
      </div>
    </div>
  );
}
