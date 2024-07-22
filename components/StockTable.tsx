"use client";

import { useEffect } from "react";
import axios from "axios";
import StockModal from "@/components/StockModal";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilteredPrices,
  setIsOpen,
  setRecentData,
  setSelectedStock,
} from "@/lib/features/dataSlice";

const fetchRecentData = async () => {
  const response = await axios.get(`/api/getPriceData`);
  return response.data;
};

const StockTable = () => {
  const dispatch = useDispatch();
  const recentData = useSelector((state: any) => state.dataSlice.recentData);
  const isOpen = useSelector((state: any) => state.dataSlice.isOpen);
  const filteredPrices = useSelector(
    (state: any) => state.dataSlice.filteredPrices
  );
  const selectedStock = useSelector(
    (state: any) => state.dataSlice.selectedStock
  );
  useEffect(() => {
    const interval = setInterval(async () => {
      dispatch(setRecentData(await fetchRecentData()));
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch, selectedStock]);

  const startSync = async () => {
    const response = await axios.get(`/api/syncPrices`);
  };
  useEffect(() => {
    startSync();
  }, []);
  const handleOpenModal = () => {
    dispatch(setIsOpen(true));
  };

  const handleCloseModal = () => {
    dispatch(setIsOpen(false));
  };

  const handleSelectStock = (stock: any) => {
    dispatch(setSelectedStock(stock));
  };

  useEffect(() => {
    dispatch(
      setFilteredPrices(
        recentData?.data?.map((price: any) => price?.data[selectedStock].usd)
      )
    );
  }, [recentData, selectedStock]);
  return (
    <div>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Real-Time Crypto Data:{" "}
            <span className="text-blue-600 uppercase">
              {selectedStock || "None"}
            </span>
          </h1>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
            onClick={handleOpenModal}
          >
            Select Crypto
          </button>
        </div>

        <StockModal
          isOpen={isOpen}
          onClose={handleCloseModal}
          onSelect={handleSelectStock}
        />
      </div>
      <div className="h-[500px] flex justify-center">
        <table className="w-50 divide-y divide-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                Price (USD)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPrices?.map((entry: any, index: any) => (
              <tr key={index}>
                <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                  {new Date(
                    recentData?.data[index]?.updatedAt
                  ).toLocaleString()}
                </td>
                <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-900">
                  ${entry.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockTable;
