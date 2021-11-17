import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Res,
    Response,
} from '@nestjs/common';
import { INTERNAL_SERVER_ERROR } from '../common/constants/status-message.const';
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

    @Get(':username')
    async findAllPaymentsOfUser(
        @Param('username') username: string,
        @Response() res,
    ) {
        try {
            const foundUser = await this.paymentService.findUserByUsername(
                username,
            );
            const foundPayments = await this.paymentService.findPaymentByUserId(
                foundUser._id,
            );

            res.status(HttpStatus.OK).json({
                success: true,
                payments: foundPayments,
            });
        } catch (error) {
            console.log(error);

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: INTERNAL_SERVER_ERROR,
            });
        }
    }

    @Get(':username/:semesterId')
    async findOne(
        @Param('username') username: string,
        @Param('semesterId') semesterId: string,
        @Response() res,
    ) {
        try {
            const foundUser = await this.paymentService.findUserByUsername(
                username,
            );
            const foundPayment =
                await this.paymentService.getPaymentByUserAndSemester(
                    foundUser._id,
                    semesterId,
                );
            return res.status(HttpStatus.OK).json({
                success: true,
                payment: foundPayment,
            });
        } catch (error) {
            console.log(error);

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: INTERNAL_SERVER_ERROR,
            });
        }
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updatePaymentDto: UpdatePaymentDto,
    ) {
        return await this.paymentService.makePayment(id, updatePaymentDto);
    }
}
