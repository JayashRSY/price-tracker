import mongoose, { Schema } from 'mongoose';

const PriceSchema = new Schema({
    data: {
        type: Object, required: true
    },
}, {
    timestamps: true
});

// Check if the 'Price' model is already defined
const PriceModel = mongoose.models.Price || mongoose.model<any>('Price', PriceSchema);

export default PriceModel;
