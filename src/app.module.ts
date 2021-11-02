import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://bk4l:bk4l@bk4l.nrrll.mongodb.net/nestjs-test?retryWrites=true&w=majority',
    ),
    AuthModule,
    UserModule,
    DatabaseModule,
    ConfigModule.forRoot({
      ignoreEnvFile: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
