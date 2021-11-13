import { Document, Model, Schema, SchemaTypes } from 'mongoose';

interface Payment extends Document {
    semester: string;
    studentId: string;
    cost?: number;
    timePaid?: Date;
    deadline?: [Date, Date];
}

type PaymentModel = Model<Payment>;

const PaymentSchema = new Schema({
    semester: {
        type: SchemaTypes.ObjectId,
        ref: 'Semester',
    },

    studentId: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
    },

    cost: Number,

    timePaid: Date,

    deadline: [Date, Date],
});

export { Payment, PaymentModel, PaymentSchema };
