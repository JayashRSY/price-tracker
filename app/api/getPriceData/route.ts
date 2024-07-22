import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDB } from '@/utils/db';
import PriceModel from '@/models/price.model';
import { NextResponse } from 'next/server';

export async function GET(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await connectToDB();

    try {
        const priceData = await PriceModel.find({})
            .sort({ createdAt: -1 }) // Assuming you want the newest records first
            .limit(20); // Limit to top 20 records

        return NextResponse.json({ success: true, data: priceData });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message });
    }
}