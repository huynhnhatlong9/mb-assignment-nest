import {DB_CONNECTION, LECTURER_MODEL, SUBJECT_MODEL, USER_MODEL} from "./database.constants";
import {ConfigType} from "@nestjs/config";
import mongodbConfig from "../config/mongodb.config";
import {Connection, createConnection} from "mongoose";
import {User, UserSchema} from "./model/user.model";
import {Subject, SubjectSchema} from "./model/subject.model";
import {Lecturer, LecturerSchema} from "./model/lecturer.model";

export const dbProviders = [
    {
        provide: DB_CONNECTION,
        useFactory: (dbConfig: ConfigType<typeof mongodbConfig>): Connection => {
            return createConnection(dbConfig.uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        },
        inject: [mongodbConfig.KEY]
    },
    {
        provide: USER_MODEL,
        useFactory: (conn: Connection) => {
            return conn.model<User>('User', UserSchema, 'users');
        },
        inject: [DB_CONNECTION]
    },
    {
        provide: SUBJECT_MODEL,
        useFactory: (conn: Connection)=>{
            return conn.model<Subject>("Subject", SubjectSchema, "subjects");
        },
        inject: [DB_CONNECTION]
    },
    {
        provide: LECTURER_MODEL,
        useFactory: (conn: Connection)=>{
            return conn.model<Lecturer>("Lecturer", LecturerSchema, "lecturers");
        },
        inject: [DB_CONNECTION]
    }

];
