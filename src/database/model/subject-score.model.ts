import { Document, Model, Schema, SchemaTypes } from 'mongoose';

interface SubjectScore extends Document {
    user: string;
    subjectClass: string;
    score: Array<number>;
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
    score: [SchemaTypes.Number],
});

export { SubjectScore, SubjectScoreSchema, SubjectScoreModel };
