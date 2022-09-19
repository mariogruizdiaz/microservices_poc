import { IResponse } from "enterprise_service_bus";

export class FwUrlResponse implements IResponse {
   constructor(public statusCode: number, public statusDescription: string, public payload: {fwURl: string}){}
}
