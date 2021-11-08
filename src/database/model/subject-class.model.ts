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
    weekday: SchemaTypes.Number,
    period: [SchemaTypes.String, SchemaTypes.String],
    room: SchemaTypes.String,
    maxStudent: SchemaTypes.Number,
    minStudent: SchemaTypes.Number,
    listStudent: [SchemaTypes.Number],
    numOfStudent: SchemaTypes.Number,
    midExamSchedule: SchemaTypes.Date,
    finalExamSchedule: SchemaTypes.Date,
    status: SchemaTypes.Number,
});

export { SubjectClass, SubjectClassModel, SubjectClassSchema };
