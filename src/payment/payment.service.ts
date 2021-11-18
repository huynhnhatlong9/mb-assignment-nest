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

    async makePayments(ids: any[]) {
        let payments = [];
        let idx = 0;
        let payment = null;
        for (idx = 0; idx < ids.length; idx += 1) {
            const updateCondition = { _id: ids[idx] };
            payment = await this.paymentRepository.makePayment(
                updateCondition,
                {
                    timePaid: new Date(),
                },
            );
            payments[idx] = payment;
        }
        return Promise.resolve(payments);
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
        return Promise.resolve(foundClass);
    }

    async updateCost(
        paymentId: string,
        listClass: SubjectClass[],
        semesterName: string,
    ) {
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
            semesterName,
        );
    }

    async getPaymentByUserAndSemester(
        userId: string,
        semesterId: string,
        semesterName: string,
    ) {
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

        return await this.updateCost(
            foundPayment._id,
            foundClass,
            semesterName,
        );
    }

    async findUserByUsername(username: string) {
        return this.paymentRepository.findUserByUsername(username);
    }

    async findPaymentByUserId(userId: string) {
        let payments = [];
        let idx = 0;
        let tmp = null;
        const semesters = await this.paymentRepository.findAllSemester();
        for (const semester of semesters) {
            tmp = await this.getPaymentByUserAndSemester(
                userId,
                semester._id,
                semester.name,
            );

            payments[idx] = tmp;

            idx += 1;
        }
        return Promise.resolve(payments);
    }

    async findSemesterBySemesterId(semesterId: string) {
        return await this.paymentRepository.findSemesterBySemesterId(
            semesterId,
        );
    }
}
