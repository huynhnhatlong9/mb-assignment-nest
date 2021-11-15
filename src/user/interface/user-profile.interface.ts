import { SubjectClass } from 'src/database/model/subject-class.model';

export interface UserProfile {
    username: string;
    email: string;
    firstname: string;
    lastname: string;
}

export interface IRegisterSubject {
    success: boolean;
    message: string;
    updatedListClass?: SubjectClass[];
}
