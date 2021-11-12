import { Document, Model, Schema, SchemaTypes } from 'mongoose';

interface SubjectScore extends Document {
    user: string;
    subject: string;
    score: Array<number>;
}

type SubjectScoreModel = Model<SubjectScore>;

const SubjectScoreSchema = new Schema<SubjectScore>({
    user: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
    },
    subject: {
        type: SchemaTypes.ObjectId,
        ref: 'Subject',
    },
    score: [SchemaTypes.Number],
});

export { SubjectScore, SubjectScoreSchema, SubjectScoreModel };
