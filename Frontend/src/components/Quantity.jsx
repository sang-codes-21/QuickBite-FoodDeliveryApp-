import React, { useState, useEffect } from "react";
import Button from "./Button.jsx";
const Quantity = ({
  initial = 1,
  min = 1,
  max = null,
  onChange = () => {},
  className = "",
}) => {
  const clamp = (v) => {
    let n = Number.isFinite(Number(v)) ? Math.floor(Number(v)) : min;
    if (max !== null && !Number.isNaN(max)) n = Math.min(n, max);
    return Math.max(n, min);
  };

  const [quantity, setQuantity] = useState(() => clamp(initial));

  useEffect(() => {
    if (quantity !== "" && Number.isFinite(Number(quantity)))
      onChange(Number(quantity));
  }, [quantity, onChange]);

  const increment = () => setQuantity((q) => clamp((q === "" ? min : q) + 1));
  const decrement = () => setQuantity((q) => clamp((q === "" ? min : q) - 1));

  const onQuantityChange = (e) => {
    const val = e.target.value;
    if (val === "") {
      setQuantity("");
      return;
    }
    // accept only digits and optionally clamp
    const parsed = parseInt(val, 10);
    if (!Number.isNaN(parsed)) {
      setQuantity(clamp(parsed));
    }
  };

  const onBlur = () => {
    if (quantity === "" || !Number.isFinite(Number(quantity)))
      setQuantity(clamp(min));
  };

  return (
    <div className={`inline-flex items-center space-x-2 ${className}`}>
      <Button size="quantity" onClick={decrement} disabled={quantity <= min}>
        -
      </Button>

      <input
        type="number"
        min={min}
        max={max ?? 30}
        value={quantity}
        onChange={onQuantityChange}
        onBlur={onBlur}
        className="w-16 text-center p-1 border rounded"
        aria-label="Quantity number"
      />

      <Button
        size="quantity"
        onClick={increment}
        aria-label="Increase quantity"
        disabled={max !== null && Number(quantity) >= max}
      >
        +
      </Button>
    </div>
  );
};

export default Quantity;
