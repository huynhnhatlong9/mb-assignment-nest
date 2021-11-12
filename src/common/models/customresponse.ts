export class CustomResponse {
    success: boolean;
    result: any;
    statusCode: number;
    token: string;
    constructor(partial: Partial<CustomResponse>) {
        Object.assign(this, partial);
    }
}
