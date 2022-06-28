export abstract class BaseResponse {
   constructor(public statusCode: number, public payload: unknown, public error?: Error) {}
}
