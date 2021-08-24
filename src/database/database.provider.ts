import {DB_CONNECTION, USER_MODEL} from "./database.constants";
import {ConfigType} from "@nestjs/config";
import mongodbConfig from "../config/mongodb.config";
import {Connection, createConnection} from "mongoose";
import {User, UserSchema} from "./model/user.model";

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
    }
];