import { Document, Model, Schema, SchemaTypes } from 'mongoose';
interface RegisterSubject extends Document {
    timeStart: string;
    timeEnd: string;
    semester: any;
    order: number;
}
type RegisterSubjectModel = Model<RegisterSubject>;
const RegisterSubjectSChema = new Schema<RegisterSubject>({
    timeStart: SchemaTypes.Date,
    timeEnd: SchemaTypes.Date,
    semester: {
        type: SchemaTypes.ObjectId,
        ref: 'Semester',
    },
    order: SchemaTypes.Number,
});
export { RegisterSubject, RegisterSubjectModel, RegisterSubjectSChema };
