import { NextResponse } from 'next/server';
import axios from 'axios';
import cron from 'node-cron';
import PriceModel from '@/models/price.model';
import { connectToDB } from '@/utils/db';
import { STOCKS } from '@/constants/STOCKS';

export async function GET() {
    // const cronJob = cron.schedule('* * * * *', fetchAndStoreStockData); // Run every minute (adjust the expression accordingly)
    // cronJob.start();
    // const interval = setInterval(async () => {
    //     const recentData = await fetchAndStoreStockData()
    //     //   dispatch(setData(recentData));
    // }, 5000);
    return new Response(null, { status: 200 });
}

const fetchAndStoreStockData = async () => {
    try {
        await connectToDB();
        const data = await fetchStockData();

        const result = await PriceModel.create({ data: data });

        return NextResponse.json({ success: true, data: result });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
const fetchStockData = async () => {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${STOCKS.join(',')}&vs_currencies=usd`, {
        headers: {
            'Content-Type': 'application/json',
            'x-cg-demo-api-key': process.env.API_KEY
        }
    });
    return response.data;
};