import { Document, Model, Schema, SchemaTypes } from 'mongoose';

interface Schedule extends Document {
    subjectClass: string;
    timeTables: Array<Array<number>>;
}

type ScheduleModel = Model<Schedule>;

const ScheduleSchema = new Schema<Schedule>({
    subjectClass: {
        type: SchemaTypes.String,
        ref: 'SubjectClass',
    },
    timeTables: [[SchemaTypes.Number]],
});

export { Schedule, ScheduleModel, ScheduleSchema };
