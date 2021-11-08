import { Document, Model, Schema, SchemaTypes } from 'mongoose';
interface ClassOfStudent extends Document {
    studentId: any;
    listClass: Array<any>;
    listRegister: any;
}
type ClassOfStudentModel = Model<ClassOfStudent>;
const classOfStudentSChema = new Schema<ClassOfStudent>({
    studentId: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
    },
    listClass: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'SubjectClass',
        },
    ],
    listRegister: [
        {
            register: {
                type: SchemaTypes.ObjectId,
                ref: 'RegisterSubject',
            },
            class: {
                type: SchemaTypes.ObjectId,
                ref: 'SubjectClass',
            },
        },
    ],
});
export { ClassOfStudent, ClassOfStudentModel, classOfStudentSChema };
