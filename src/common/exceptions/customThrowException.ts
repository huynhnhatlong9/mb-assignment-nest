import { HttpException, HttpStatus } from '@nestjs/common';

export const CustomThrowException = (message: string, code: HttpStatus, errorCode?: string, error?: Error): void => {
    throw new HttpException({ message, errorCode, error }, code);
};

export const getError = (message: string, code: HttpStatus, errorCode?: string, error?: Error): HttpException => {
    return new HttpException({ message, errorCode, error }, code);
};
