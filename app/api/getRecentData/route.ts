import { NextResponse } from 'next/server';
import stockDataModel from '@/models/stockData.model';
import { connectToDB } from '@/utils/db';
export async function GET(request: any) {
    await connectToDB();

    const { searchParams } = new URL(request.url);
    const stock = searchParams.get('stock');

    try {
        const data = await stockDataModel.find({ stock }).sort({ timestamp: -1 }).limit(20).exec();
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ message: error.message });
    }
}
