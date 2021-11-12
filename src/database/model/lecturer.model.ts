import { Document, Model, Schema, SchemaTypes } from 'mongoose';

interface Lecturer extends Document {
    email: string;
    name: string;
    phone: string;
    subject: Array<string>;
}

type LecturerModel = Model<Lecturer>;

const LecturerSchema = new Schema({
    email: SchemaTypes.String,
    name: SchemaTypes.String,
    phone: SchemaTypes.String,
    subject: {
        type: [SchemaTypes.ObjectId],
        ref: 'Subject',
    },
});

export { Lecturer, LecturerModel, LecturerSchema };
