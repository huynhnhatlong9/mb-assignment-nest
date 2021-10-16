import {Model, Schema, SchemaTypes} from "mongoose";

interface SubjectClass {
    semester: string;
    subject: any;
    leturer: any;
    weekStudy: Array<number>;
    room: string;
    maxStudent: number;
    minStudent: number;
    numOfStudent: number;
}
