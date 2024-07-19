import { NextResponse } from 'next/server';
import axios from 'axios';
import PriceModel from '@/models/price.model';
import { connectToDB } from '@/utils/db';
const stocks = ['bitcoin', 'ethereum', 'dogecoin', 'litecoin', 'ripple'];

const fetchStockData = async () => {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${stocks.join(',')}&vs_currencies=usd`, {
        headers: {
            'Content-Type': 'application/json',
            'x-cg-demo-api-key': process.env.API_KEY
        }
    });
    return response.data;
};

export async function GET() {
    await connectToDB();

    try {
        const data = await fetchStockData();
        console.log("🚀 ~ file: route.ts:17 ~ data:", data);

        const result = await PriceModel.create({ data: data });

        return NextResponse.json({ success: true, data: result });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
