import { Inject, Injectable } from '@nestjs/common';
import {
    CLASSOFSTUDENT_MODEL,
    PAYMENT_MODEL,
    SUBJECT_CLASS_MODEL,
    SUBJECT_MODEL,
    USER_MODEL,
} from 'src/database/database.constants';
import { ClassOfStudentModel } from 'src/database/model/classofstudent.model';
import { PaymentModel } from 'src/database/model/payment';
import { SubjectClassModel } from 'src/database/model/subject-class.model';
import { SubjectModel } from 'src/database/model/subject.model';
import { UserModel } from 'src/database/model/user.model';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { UpdatePaymentDto } from '../dto/update-payment.dto';

@Injectable()
export class PaymentRepository {
    constructor(
        @Inject(PAYMENT_MODEL) private paymentModel: PaymentModel,
        @Inject(CLASSOFSTUDENT_MODEL)
        private classOfStudentModel: ClassOfStudentModel,
        @Inject(SUBJECT_CLASS_MODEL)
        private subjectClassModel: SubjectClassModel,
        @Inject(SUBJECT_MODEL) private subjectModel: SubjectModel,
        @Inject(USER_MODEL) private userModel: UserModel,
    ) {}

    async createNewQuestion(createPayment: CreatePaymentDto) {
        const createdQuestion = await this.paymentModel.create(createPayment);
        return createdQuestion;
    }

    async getPaymentBySemester(semesterId: string) {
        return await this.paymentModel.findOne({ semester: semesterId });
    }

    async findClassByStudentId(studentId: string) {
        return await this.classOfStudentModel.findOne({
            studentId,
        });
    }

    async findClassById(classId: string) {
        return await this.subjectClassModel.findById(classId);
    }

    async makePayment(
        updatePaymentCondition: { _id: string },
        updatePaymentDto: UpdatePaymentDto,
    ) {
        return await this.paymentModel.findOneAndUpdate(
            updatePaymentCondition,
            updatePaymentDto,
            { new: true, useFindAndModify: false },
        );
    }

    async updateCost(
        updatePaymentCondition: { _id: string },
        updatedCost: number,
    ) {
        return await this.paymentModel.findOneAndUpdate(
            updatePaymentCondition,
            { cost: updatedCost },
            { new: true, useFindAndModify: false },
        );
    }

    async findSubjectById(subjectId: string) {
        return await this.subjectModel.findById(subjectId);
    }

    async findPaymentByUserId(studentId: string) {
        return await this.paymentModel.findOne({ studentId });
    }

    async findUserByUsername(username: string) {
        return await this.userModel.findOne({ username });
    }
}
