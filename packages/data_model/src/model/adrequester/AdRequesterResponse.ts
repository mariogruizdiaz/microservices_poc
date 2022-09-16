import { BaseResponse } from "enterprise_service_bus";

export class AdRequesterResponse extends BaseResponse {

   constructor(public statusCode: number, public ads: string[], public error?: Error) {
    super(statusCode, ads, error);
   }

}
