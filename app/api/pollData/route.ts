import { NextResponse } from 'next/server';
import axios from 'axios';
import stockDataModel from '@/models/stockData.model';
import { connectToDB } from '@/utils/db';
const stocks = ['bitcoin', 'ethereum', 'dogecoin', 'litecoin', 'ripple'];

const fetchStockData = async () => {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${stocks.join(',')}&vs_currencies=usd`);
    return response.data;
};

export async function GET() {
    await connectToDB();

    try {
        const data = await fetchStockData();
        const stockEntries = stocks.map(stock => ({
            stock,
            price: data[stock].usd,
            timestamp: new Date()
        }));

        await stockDataModel.insertMany(stockEntries);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
