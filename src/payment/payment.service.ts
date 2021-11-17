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
        return await this.paymentRepository.createNewPayment(createPaymentDto);
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

    async getClassBySemesterOfStudent(studentId: string, semesterId: any) {
        const foundListClassId =
            await this.paymentRepository.findClassByStudentId(studentId);
        let foundClass = [];
        let idx = 0;
        let classObj = null;
        for (const classId of foundListClassId.listClass) {
            classObj = await this.paymentRepository.findClassById(classId);
            const tmp = classObj.semester;
            if (tmp == semesterId.toString()) {
                console.log(classObj.semester, semesterId);
                foundClass[idx] = classObj;
                idx++;
            }
        }
        console.log(foundClass);
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

        const foundSemester =
            await this.paymentRepository.findSemesterBySemesterId(semesterId);

        if (!foundPayment) {
            foundPayment = await this.create({
                semester: semesterId,
                studentId: userId,
                cost: null,
                timePaid: null,
                deadline: [foundSemester.startTime, foundSemester.endTime],
            });
        }

        const foundClass = await this.getClassBySemesterOfStudent(
            userId,
            semesterId,
        );

        return await this.updateCost(foundPayment._id, foundClass);
    }

    async findUserByUsername(username: string) {
        return this.paymentRepository.findUserByUsername(username);
    }

    async findPaymentByUserId(userId: string) {
        let payments = [];
        let idx = 0;
        const semesters = await this.paymentRepository.findAllSemester();
        for (const semester of semesters) {
            payments[idx] = await this.getPaymentByUserAndSemester(
                userId,
                semester._id,
            );
            idx += 1;
        }
        return Promise.resolve(payments);
    }
}
