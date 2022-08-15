export abstract class BaseRequest {
   constructor(public subject: string, public payload: unknown) {}
}
