import {
    DB_CONNECTION,
    LECTURER_MODEL,
    SCHEDULER_MODEL,
    SEMESTER_MODEL,
    SUBJECT_CLASS_MODEL,
    SUBJECT_MODEL,
    SUBJECT_SCORE_MODEL,
    USER_MODEL,
    CLASSOFSTUDENT_MODEL,
    REGISTERSUBJECT_MODEL,
} from './database.constants';
import { ConfigType } from '@nestjs/config';
import mongodbConfig from '../config/mongodb.config';
import { Connection, createConnection } from 'mongoose';
import { User, UserSchema } from './model/user.model';
import { Subject, SubjectSchema } from './model/subject.model';
import { Lecturer, LecturerSchema } from './model/lecturer.model';
import { SubjectClass, SubjectClassSchema } from './model/subject-class.model';
import { SubjectScore, SubjectScoreSchema } from './model/subject-score.model';
import { Schedule, ScheduleSchema } from './model/schedule.model';
import { Semester, SemesterSchema } from './model/semester.model';
import {
    ClassOfStudent,
    classOfStudentSChema,
} from './model/classofstudent.model';
import {
    RegisterSubject,
    RegisterSubjectSChema,
} from './model/registersubject.model';
export const dbProviders = [
    {
        provide: DB_CONNECTION,
        useFactory: (
            dbConfig: ConfigType<typeof mongodbConfig>,
        ): Connection => {
            return createConnection(dbConfig.uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        },
        inject: [mongodbConfig.KEY],
    },
    {
        provide: USER_MODEL,
        useFactory: (conn: Connection) => {
            return conn.model<User>('User', UserSchema, 'users');
        },
        inject: [DB_CONNECTION],
    },
    {
        provide: SUBJECT_MODEL,
        useFactory: (conn: Connection) => {
            return conn.model<Subject>('Subject', SubjectSchema, 'subjects');
        },
        inject: [DB_CONNECTION],
    },
    {
        provide: LECTURER_MODEL,
        useFactory: (conn: Connection) => {
            return conn.model<Lecturer>(
                'Lecturer',
                LecturerSchema,
                'lecturers',
            );
        },
        inject: [DB_CONNECTION],
    },
    {
        provide: SUBJECT_CLASS_MODEL,
        useFactory: (conn: Connection) => {
            return conn.model<SubjectClass>(
                'SubjectClass',
                SubjectClassSchema,
                'subject_classes',
            );
        },
        inject: [DB_CONNECTION],
    },
    {
        provide: SUBJECT_SCORE_MODEL,
        useFactory: (conn: Connection) => {
            return conn.model<SubjectScore>(
                'SubjectScore',
                SubjectScoreSchema,
                'subject_scores',
            );
        },
        inject: [DB_CONNECTION],
    },
    {
        provide: SCHEDULER_MODEL,
        useFactory: (conn: Connection) => {
            return conn.model<Schedule>(
                'Schedule',
                ScheduleSchema,
                'schedules',
            );
        },
        inject: [DB_CONNECTION],
    },
    {
        provide: SEMESTER_MODEL,
        useFactory: (conn: Connection) => {
            return conn.model<Semester>(
                'Semester',
                SemesterSchema,
                'semesters',
            );
        },
        inject: [DB_CONNECTION],
    },
    {
        provide: CLASSOFSTUDENT_MODEL,
        useFactory: (conn: Connection) => {
            return conn.model<ClassOfStudent>(
                'ClassOfStudent',
                classOfStudentSChema,
                'classOfStudent',
            );
        },
        inject: [DB_CONNECTION],
    },
    {
        provide: REGISTERSUBJECT_MODEL,
        useFactory: (conn: Connection) => {
            return conn.model<RegisterSubject>(
                'RegisterSubject',
                RegisterSubjectSChema,
                'registerSubject',
            );
        },
        inject: [DB_CONNECTION],
    },
];
