export class CreatePaymentDto {
    semester?: string;

    studentId?: string;

    cost?: number;

    timePaid?: Date;

    deadline?: [Date, Date] | any[];
}
