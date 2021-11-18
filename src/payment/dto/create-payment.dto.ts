export class CreatePaymentDto {
    semester?: string;

    studentId?: string;

    cost?: number;

    timePaid?: Date;

    semesterName?: string;

    deadline?: [Date, Date] | any[];
}
