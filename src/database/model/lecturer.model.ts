import {Document, Model, Schema, SchemaTypes} from "mongoose";
import {Subject} from "./subject.model";

interface Lecturer extends Document{
    email: string;
    name: string;
    phone: string;
    subject: Array<any>
}

type LecturerModel = Model<Lecturer>

const LecturerSchema = new Schema({
    email: SchemaTypes.String,
    name: SchemaTypes.String,
    phone: SchemaTypes.Number,
    subject: [{
        type: SchemaTypes.ObjectId,
        ref: "Subject"
    }]
})

export {
    Lecturer,
    LecturerModel,
    LecturerSchema
}

