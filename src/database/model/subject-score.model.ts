import { Document, Model, Schema, SchemaTypes } from 'mongoose';

interface SubjectScore extends Document {
    user: string;
    subjectClass: string;
    score: Array<any>;
    total: number;
}

type SubjectScoreModel = Model<SubjectScore>;

const SubjectScoreSchema = new Schema<SubjectScore>({
    user: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
    },
    subjectClass: {
        type: SchemaTypes.ObjectId,
        ref: 'SubjectClass',
    },
    score: {
        type: [
            {
                type: { type: SchemaTypes.String },
                score: { type: SchemaTypes.Number },
                rate: { type: SchemaTypes.Number },
            },
        ],
    },
    total: SchemaTypes.Number,
});

export { SubjectScore, SubjectScoreSchema, SubjectScoreModel };
