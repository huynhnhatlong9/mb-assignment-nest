import { Document, Model, Schema, SchemaTypes } from 'mongoose';

interface SubjectClass extends Document {
    semester: string;
    subject: any;
    lecturer: any;
    weekStudy: Array<number>;
    room: string;
    maxStudent: number;
    minStudent: number;
    listStudent: Array<number>;
    numOfStudent: number;
    midExamSchedule: Date;
    finalExamSchedule: Date;
}

type SubjectClassModel = Model<SubjectClass>;

const SubjectClassSchema = new Schema<SubjectClass>({
    semester: {
        type: SchemaTypes.String,
        ref: 'Semester',
    },
    subject: {
        type: SchemaTypes.String,
        ref: 'Subject',
    },
    lecturer: {
        type: SchemaTypes.ObjectId,
        ref: 'Lecturer',
    },
    weekStudy: [SchemaTypes.Number],
    room: SchemaTypes.String,
    maxStudent: SchemaTypes.Number,
    minStudent: SchemaTypes.Number,
    listStudent: [SchemaTypes.Number],
    numOfStudent: SchemaTypes.Number,
    midExamSchedule: SchemaTypes.Date,
    finalExamSchedule: SchemaTypes.Date,
});

export { SubjectClass, SubjectClassModel, SubjectClassSchema };
