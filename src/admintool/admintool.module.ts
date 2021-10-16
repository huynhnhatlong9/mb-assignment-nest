import { Module } from '@nestjs/common';
import { AdminToolController } from './admintool.controller';
import { AdminToolService } from './admintool.service';
import {DatabaseModule} from "../database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [AdminToolController],
  providers: [AdminToolService]
})
export class AdmintoolModule {}
