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
        type: SchemaTypes.String,
        ref: 'Lecturer',
    },
    weekStudy: [SchemaTypes.Number],
    room: SchemaTypes.String,
    maxStudent: SchemaTypes.Number,
    minStudent: SchemaTypes.Number,
    listStudent: [SchemaTypes.Number],
    numOfStudent: SchemaTypes.Number,
});

export { SubjectClass, SubjectClassModel, SubjectClassSchema };
