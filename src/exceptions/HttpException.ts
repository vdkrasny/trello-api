export class HttpException extends Error {
    constructor(public message: string, public httpStatus: number, public name: string) {
        super(message);

        this.httpStatus = httpStatus;
        this.name = name;
    }
}

export default HttpException;
