import mongoose, { Schema, Document } from 'mongoose';

interface IStockData extends Document {
    stock: string;
    price: number;
    timestamp: Date;
}

const StockDataSchema: Schema = new Schema({
    stock: { type: String, required: true },
    price: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now, required: true },
});

export default mongoose.models.StockData || mongoose.model<IStockData>('StockData', StockDataSchema);
