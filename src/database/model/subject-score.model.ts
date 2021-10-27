import { Document, Model, Schema, SchemaTypes } from 'mongoose';

interface SubjectScore extends Document {
    user: string;
    subject: string;
    score: Array<number>;
}

type SubjectScoreModel = Model<SubjectScore>;

const SubjectScoreSchema = new Schema<SubjectScore>({
    user: {
        type: SchemaTypes.String,
        ref: 'User',
    },
    subject: {
        type: SchemaTypes.String,
        ref: 'Subject',
    },
    score: [SchemaTypes.Number],
});

export { SubjectScore, SubjectScoreSchema, SubjectScoreModel };
