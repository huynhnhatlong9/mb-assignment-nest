import {UserPrincipal} from "./user-principal";

export interface AuthenticatedRequest extends Request{
    user: UserPrincipal
}
