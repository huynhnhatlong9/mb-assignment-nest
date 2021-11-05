import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './repositories/user.repository';
@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [
        UserService,
        UserRepository],
    exports: [UserService],
})
export class UserModule {}
