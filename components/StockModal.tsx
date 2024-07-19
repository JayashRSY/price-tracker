"use client";

import { useAppDispatch } from "@/lib/hooks";
import { useState } from "react";

const StockModal = () => {
  const dispatch = useAppDispatch();
  const [stock, setStock] = useState("");

  const handleChangeStock = () => {
    if (stock) {
      // dispatch(setSelectedStock(stock));
    }
  };

  return (
    <div>
      <input
        type="text"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        placeholder="Enter stock or crypto"
      />
      <button onClick={handleChangeStock}>Change Stock</button>
    </div>
  );
};

export default StockModal;
