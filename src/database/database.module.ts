import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import mongodbConfig from '../config/mongodb.config';
import {dbProviders} from "./database.provider";

@Module({
    imports: [
        ConfigModule.forFeature(mongodbConfig)
    ],
    providers: [
        ...dbProviders
    ],
    exports: [
        ...dbProviders
    ]
})
export class DatabaseModule {
}
