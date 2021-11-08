import { Document, Model, Schema, SchemaTypes } from 'mongoose';

interface Question extends Document {
    title: string;
    content: string;
    email: string;
    file: string;
}

type QuestionModel = Model<Question>;

const QuestionSchema = new Schema({
    title: {
        type: String,
        require: true,
    },

    content: String,

    email: {
        type: String,
        require: true,
    },

    file: String,
});

export { Question, QuestionModel, QuestionSchema };
