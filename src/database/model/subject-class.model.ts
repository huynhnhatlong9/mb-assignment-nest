import { statusClassEnum } from './../../common/enums/statusClass.enum';
import { weekdayEnum } from './../../common/enums/weekday.enum';
import { Document, Model, Schema, SchemaTypes } from 'mongoose';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

interface SubjectClass extends Document {
    semester: any;
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
    midExamSchedule: any;
    finalExamSchedule: any;
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
<<<<<<< HEAD
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
=======
    weekStudy: [SchemaTypes.Number],
    weekday: SchemaTypes.Number,
    period: [SchemaTypes.String, SchemaTypes.String],
    room: SchemaTypes.String,
    maxStudent: SchemaTypes.Number,
    minStudent: SchemaTypes.Number,
    listStudent: [SchemaTypes.Number],
    numOfStudent: SchemaTypes.Number,
    midExamSchedule: {
        time: SchemaTypes.Date,
        address: SchemaTypes.String,
    },
    finalExamSchedule: {
        time: SchemaTypes.Date,
        address: SchemaTypes.String,
    },
    status: SchemaTypes.Number,
>>>>>>> ebf6065de81488b2cf58b185a4b06119ac5c2299
});

export { SubjectClass, SubjectClassModel, SubjectClassSchema };
