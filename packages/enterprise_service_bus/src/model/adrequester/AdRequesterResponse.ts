import { BaseResponse } from "../BaseResponse";

export class AdRequesterResponse extends BaseResponse {

   constructor(public statusCode: number, public ads: string[], public error?: Error) {
    super(statusCode, ads, error);
   }

}
