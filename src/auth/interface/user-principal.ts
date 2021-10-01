import {RolesType} from "../../shared/roles-type.enum";

export class UserPrincipal{
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    roles: RolesType[]
}
