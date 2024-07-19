"use client";

import { useEffect } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

const fetchRecentData = async (stock: string) => {
  const response = await axios.get(`/api/getRecentData?stock=${stock}`);
  return response.data;
};

const StockTable = () => {
  const dispatch = useAppDispatch();
  //   const data = useAppSelector((state: any) => state.stock.data);
  let data: any = [];
  //   const selectedStock = useAppSelector(
  //     (state: any) => state.stock.selectedStock
  //   );
  const selectedStock = "";
  useEffect(() => {
    const interval = setInterval(async () => {
      const recentData = await fetchRecentData(selectedStock);
      //   dispatch(setData(recentData));
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch, selectedStock]);

  return (
    <div>
      <h1>Real-Time Stock Data: {selectedStock}</h1>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry: any, index: any) => (
            <tr key={index}>
              <td>{new Date(entry.timestamp).toLocaleString()}</td>
              <td>{entry.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;
