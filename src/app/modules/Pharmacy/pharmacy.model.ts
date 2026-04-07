import { Schema, model } from 'mongoose';
import { IPharmacy, PharmacyModel } from './pharmacy.interface';

const pharmacySchema = new Schema<IPharmacy>(
    {
        name: { type: String, required: true },
        ownerName: { type: String },
        description: { type: String },
        area: { type: String, required: true },
        address: { type: String },
        phone: [{ type: String, required: true }],
        whatsapp: { type: String },
        locationUrl: { type: String },
        status: { type: String, enum: ['open', 'closed'], default: 'open' },
        isHomeDelivery: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false }
    },
    { timestamps: true }
);

// Query Middleware: Delete করা ডাটা হাইড রাখতে
pharmacySchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Pharmacy = model<IPharmacy, PharmacyModel>('Pharmacy', pharmacySchema);