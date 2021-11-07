import { Curriculum } from 'src/database/model/curriculum.model';

export interface ICreateCurrilum {
    success: Boolean;
    createdCurriculum?: Curriculum;
    message?: String;
}
