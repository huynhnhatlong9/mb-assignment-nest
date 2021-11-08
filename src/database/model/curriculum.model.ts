import { Document, Model, Schema, SchemaTypes } from 'mongoose';

interface Curriculum extends Document {
    curriculumName: string;
    price: number;
    author: string;
    image: string;
    status: string;
    quanlity: number;
    carts: string[];
}

type CurriculumModel = Model<Curriculum>;

const CurriculumSchema = new Schema({
    curriculumName: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    author: {
        type: String,
        require: true,
    },
    image: {
        type: String,
    },
    status: {
        type: String,
        enum: ['STOCKING', 'SOLDOUT'],
        default: 'STOCKING',
        require: true,
    },
    quanlity: {
        type: Number,
        default: 100,
    },
    carts: {
        type: [SchemaTypes.ObjectId],
        ref: 'Cart',
        default: [],
    },
});

export { Curriculum, CurriculumModel, CurriculumSchema };
