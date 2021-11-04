import { RolesType } from './../../shared/roles-type.enum';
export class AccessToken {
    accessToken: string;
    username:string;
    firstname:string;
    lastname:string;
    roles:RolesType[]
}
