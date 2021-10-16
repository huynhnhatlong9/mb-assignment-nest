import {Inject, Injectable} from '@nestjs/common';
import {LECTURER_MODEL, SUBJECT_MODEL} from "../database/database.constants";
import {Lecturer, LecturerModel} from "../database/model/lecturer.model";
import {Subject, SubjectModel} from "../database/model/subject.model";
import {CreateLectureDto} from "./dto/CreateLecture.dto";
import {catchError, from, Observable, of, throwError} from "rxjs";
import {CreateSubjectDto} from "./dto/CreateSubject.dto";

@Injectable()
export class AdminToolService {
    constructor(
        @Inject(LECTURER_MODEL) private lectureModel: LecturerModel,
        @Inject(SUBJECT_MODEL) private subjectModel: SubjectModel
    ) {
    }

    createLecture(lecture: CreateLectureDto): Observable<any> {
        return from(this.lectureModel.create(lecture))

    }

    createSubject(subject: CreateSubjectDto): Observable<Subject> {
        return from(this.subjectModel.create(subject));
    }

}
