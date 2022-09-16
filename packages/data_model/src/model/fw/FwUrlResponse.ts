import { BaseResponse } from "enterprise_service_bus";

export class FwUrlResponse extends BaseResponse {

   constructor(public statusCode: number, public fwURl: string, public error?: Error) {
    super(statusCode, fwURl, error);
   }

}
