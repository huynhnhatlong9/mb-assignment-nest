import {Document, Model, Schema, SchemaType, SchemaTypes} from "mongoose";
import {from, Observable} from "rxjs";
import {hash, compare} from "bcrypt";

interface User extends Document {
    comparePassword(password: string): Observable<boolean>;

    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly firstname: string;
    readonly lastname: string;
}

type UserModel = Model<User>;

const UserSchema = new Schema<User>({
    username: SchemaTypes.String,
    email: SchemaTypes.String,
    password: SchemaTypes.String,
    firstname: SchemaTypes.String,
    lastname: SchemaTypes.String
}, {
    timestamps: true
});

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

export {
    User,
    UserSchema,
    UserModel,
    comparePasswordMethod
};