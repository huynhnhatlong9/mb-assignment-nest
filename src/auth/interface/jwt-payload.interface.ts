import {RolesType} from "../../shared/roles-type.enum";

export class JwtPayload{
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    roles: RolesType[]
}
