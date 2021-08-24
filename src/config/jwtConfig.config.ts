import {registerAs} from "@nestjs/config";

export default registerAs('jwt',()=>{
    return {
        secretKey: process.env.JWT_SECRET_KEY || 'rzxlszyykpbgqcflzxsqcysyhljt',
        expiresIn: process.env.JWT_EXPIRES_IN || '3600s',
    }
})