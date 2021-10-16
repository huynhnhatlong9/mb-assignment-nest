import {Document, Model, Schema, SchemaTypes} from "mongoose";

interface Subject extends Document {
    name: string;
    credit: number;
    //so tiet
    lession: number;
    // thoi gian 1 tiet <min>
    durationPerLession: number;
}

type SubjectModel = Model<Subject>;

const SubjectSchema = new Schema<Subject>({
    name: SchemaTypes.String,
    credit: SchemaTypes.Number,
    lession: SchemaTypes.Number,
    durationPerLession: SchemaTypes.Number
});

export {
    SubjectModel,
    Subject,
    SubjectSchema
};
