"use client";
import { STOCKS } from "@/constants/STOCKS";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedStock } from "../lib/features/dataSlice";

interface StockModalProps {
  isOpen: boolean;
  onSelect: (selectedItem: any) => void;
  onClose: () => void;
}
const StockModal: React.FC<StockModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const dispatch = useDispatch();
  const selectedStock = useSelector(
    (state: any) => state.dataSlice.selectedStock
  );

  const handleStockClick = (stock: any) => {
    dispatch(setSelectedStock(stock));
  };

  const handleSelect = () => {
    if (selectedStock) {
      onSelect(selectedStock);
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto ${isOpen ? "" : "hidden"}`}
    >
      <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-50 transition-opacity ease-in-out duration-300"></div>
      <div className="fixed inset-0 overflow-auto z-50 mt-4">
        <div className="bg-white rounded-lg shadow-lg mx-auto w-1/2 p-4 md:w-1/3">
          <h3 className="font-bold text-lg pb-2">Select a Stock</h3>
          <ul className="list-none">
            {STOCKS.map((stock) => (
              <li
                key={stock}
                className={`p-2 cursor-pointer hover:bg-blue-200 ${
                  selectedStock === stock ? "bg-blue-500 text-white" : ""
                }`}
                onClick={() => handleStockClick(stock)}
              >
                {stock}
              </li>
            ))}
          </ul>
          <div className="flex justify-end pt-4">
            <button
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleSelect}
            >
              Select
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockModal;
