import { Injectable } from '@nestjs/common';
import { COST_PER_CREDIT } from 'src/common/constants/cost-credit-const';
import { SubjectClass } from 'src/database/model/subject-class.model';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentRepository } from './repositories/payment.repository';

@Injectable()
export class PaymentService {
    constructor(private paymentRepository: PaymentRepository) {}

    async create(createPaymentDto: CreatePaymentDto) {
        return await this.paymentRepository.createNewQuestion(createPaymentDto);
    }

    async findBySemesterId(id: string) {
        return await this.findBySemesterId(id);
    }

    async makePayment(id: string, updatePaymentDto: UpdatePaymentDto) {
        const updateCondition = { _id: id };
        return await this.paymentRepository.makePayment(
            updateCondition,
            updatePaymentDto,
        );
    }

    async getClassBySemesterOfStudent(studentId: string, semesterId: string) {
        const foundListClassId =
            await this.paymentRepository.findClassByStudentId(studentId);
        let foundClass = [];
        let idx = 0;
        for (const classId of foundListClassId.listClass) {
            let classObj = await this.paymentRepository.findClassById(classId);
            if (classObj.semester == semesterId) {
                foundClass[idx] = classObj;
                idx++;
            }
        }
        return Promise.resolve(foundClass);
    }

    async updateCost(paymentId: string, listClass: SubjectClass[]) {
        let credits = 0;
        let foundSubject = null;

        for (const classObj of listClass) {
            foundSubject = await this.paymentRepository.findSubjectById(
                classObj.subject,
            );
            credits += foundSubject.credit;
        }

        const newCost = credits * COST_PER_CREDIT;

        const updateCondition = { _id: paymentId };

        return await this.paymentRepository.updateCost(
            updateCondition,
            newCost,
        );
    }

    async getPaymentByUserAndSemester(userId: string, semesterId: string) {
        let foundPayment = await this.paymentRepository.getPaymentBySemester(
            semesterId,
        );

        if (!foundPayment) {
            foundPayment = await this.create({
                semester: semesterId,
                studentId: userId,
                cost: null,
                timePaid: null,
                deadline: [],
            });
        }

        const foundClass = await this.getClassBySemesterOfStudent(
            userId,
            semesterId,
        );

        return await this.updateCost(foundPayment._id, foundClass);
    }
}
