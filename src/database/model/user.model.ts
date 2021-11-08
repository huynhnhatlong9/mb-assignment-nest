import { Document, Model, Schema, SchemaTypes } from 'mongoose';
import { from, Observable } from 'rxjs';
import { compare, hash } from 'bcrypt';
import { RolesType } from '../../shared/roles-type.enum';

interface User extends Document {
    comparePassword(password: string): Observable<boolean>;

    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly firstname: string;
    readonly lastname: string;
    readonly roles: RolesType[];
    personalinfo: {
        idcard: string;
        phonenumber: string;
        birthday: Date;
        address: string;
    };
    academicinfo: {
        status: string;
        faculty: string;
        brach: string;
        class: string;
        rank: string;
    };
}

type UserModel = Model<User>;

const UserSchema = new Schema<User>(
    {
        username: SchemaTypes.String,
        email: SchemaTypes.String,
        password: SchemaTypes.String,
        firstname: SchemaTypes.String,
        lastname: SchemaTypes.String,
        roles: [{ type: SchemaTypes.Number, require: false }],
        personalinfo: {
            idcard: SchemaTypes.String,
            phonenumber: SchemaTypes.String,
            birthday: SchemaTypes.Date,
            address: SchemaTypes.String,
        },
        academicinfo: {
            status: SchemaTypes.String,
            faculty: SchemaTypes.String,
            brach: SchemaTypes.String,
            class: SchemaTypes.String,
            rank: SchemaTypes.String,
        },
    },
    {
        timestamps: true,
    },
);

async function preSaveHook(next) {
    // Only run this function if password was modified
    if (!this.isModified('password')) return next();

    // Hash the password
    const password = await hash(this.password, 12);
    this.set('password', password);

    next();
}

UserSchema.pre<User>('save', preSaveHook);

function comparePasswordMethod(password: string): Observable<boolean> {
    return from(compare(password, this.password));
}

UserSchema.methods.comparePassword = comparePasswordMethod;

export { User, UserSchema, UserModel, comparePasswordMethod };
