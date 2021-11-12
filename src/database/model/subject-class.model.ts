import { statusClassEnum } from './../../common/enums/statusClass.enum';
import { weekdayEnum } from './../../common/enums/weekday.enum';
import { Document, Model, Schema, SchemaTypes } from 'mongoose';

interface SubjectClass extends Document {
    semester: string;
    subject: any;
    lecturer: any;
    weekStudy: Array<number>;
    weekday: weekdayEnum;
    period: Array<string>;
    room: string;
    maxStudent: number;
    minStudent: number;
    listStudent: Array<number>;
    numOfStudent: number;
    midExamSchedule: Date;
    finalExamSchedule: Date;
    status: statusClassEnum;
}

type SubjectClassModel = Model<SubjectClass>;

const SubjectClassSchema = new Schema<SubjectClass>({
    semester: {
        type: SchemaTypes.ObjectId,
        ref: 'Semester',
    },
    subject: {
        type: SchemaTypes.ObjectId,
        ref: 'Subject',
    },
    lecturer: {
        type: SchemaTypes.ObjectId,
        ref: 'Lecturer',
    },
    weekStudy: [Number],
    weekday: Number,
    period: [String, String],
    room: String,
    maxStudent: Number,
    minStudent: Number,
    listStudent: [Number],
    numOfStudent: Number,
    midExamSchedule: Date,
    finalExamSchedule: Date,
    status: Number,
});

export { SubjectClass, SubjectClassModel, SubjectClassSchema };
