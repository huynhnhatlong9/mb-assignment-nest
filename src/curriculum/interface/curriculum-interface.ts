import { Curriculum } from 'src/database/model/curriculum.model';

export interface ICreateCurrilum {
    success: Boolean;
    createdCurriculum?: Curriculum;
    message?: String;
}

export interface IGetAllCurriculum {
    success: Boolean;
    curriculums?: Curriculum[];
    message?: String;
}

export interface IGetOneCurriculum {
    success: Boolean;
    foundCurriculum?: Curriculum;
    message?: String;
}

export interface IUpdateCurriculum {
    success: Boolean;
    updatedCurriculum?: Curriculum;
    message?: String;
}

export interface IDeleteCurriculum {
    success: String;
    message: String;
}
