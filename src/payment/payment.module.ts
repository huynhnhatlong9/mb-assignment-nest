import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PaymentRepository } from './repositories/payment.repository';

@Module({
    imports: [DatabaseModule],
    controllers: [PaymentController],
    providers: [PaymentService, PaymentRepository],
    exports: [PaymentService],
})
export class PaymentModule {}
