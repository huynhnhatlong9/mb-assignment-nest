import { Document, Model, Schema, SchemaTypes } from 'mongoose';

interface Semester extends Document {
    name: string;
    startTime: Date;
    endTime: Date;
}

type SemesterModel = Model<Semester>;

const SemesterSchema = new Schema<Semester>({
    name: {
        type: String,
        unique: true,
    },
    startTime: SchemaTypes.Date,
    endTime: SchemaTypes.Date,
});

export { Semester, SemesterModel, SemesterSchema };
