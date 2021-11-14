import { Document, Model, Schema, SchemaTypes } from 'mongoose';

interface Cart extends Document {
    curriculums: string[];
    userId: string;
    phone?: string;
    address?: string;
}

type CartModel = Model<Cart>;

const CartSchema = new Schema({
    userId: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
    },

    curriculums: {
        type: [SchemaTypes.ObjectId],
        ref: 'Curriculum',
    },

    phone: String,

    address: String,
});

export { Cart, CartModel, CartSchema };
