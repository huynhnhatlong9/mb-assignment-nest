/* eslint-disable @typescript-eslint/no-explicit-any */
export class MailServiceRes {
    success: boolean;
    result: any;
    error: any;
    statusCode: number;
    constructor(partial: Partial<MailServiceRes>) {
        Object.assign(this, partial);
    }
}
