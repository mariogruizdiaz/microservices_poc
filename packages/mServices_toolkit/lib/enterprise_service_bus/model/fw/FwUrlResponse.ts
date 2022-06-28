import { BaseResponse } from "../BaseResponse";

export class FwUrlResponse extends BaseResponse {

   constructor(public statusCode: number, public fwURl: string, public error?: Error) {
    super(statusCode, fwURl, error);
   }

}
