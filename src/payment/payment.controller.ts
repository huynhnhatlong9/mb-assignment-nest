import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Post()
    async create(@Body() createPaymentDto: CreatePaymentDto) {
        return await this.paymentService.create(createPaymentDto);
    }

    @Get(':userId/:semesterId')
    async findOne(
        @Param('semesterId') semesterId: string,
        @Param('userId') userId: string,
    ) {
        return await this.paymentService.getPaymentByUserAndSemester(
            userId,
            semesterId,
        );
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updatePaymentDto: UpdatePaymentDto,
    ) {
        return await this.paymentService.makePayment(id, updatePaymentDto);
    }
}
