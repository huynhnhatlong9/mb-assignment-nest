import { Document, Model, Schema, SchemaTypes } from 'mongoose';

interface Semester extends Document {
    name: string;
    duringTime: Array<Date>;
}

type SemesterModel = Model<Semester>;

const SemesterSchema = new Schema<Semester>({
    name: SchemaTypes.String,
    duringTime: [SchemaTypes.Date],
});

export { Semester, SemesterModel, SemesterSchema };
