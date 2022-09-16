import { BaseResponse } from "enterprise_service_bus";

export class BeaconResponse extends BaseResponse {

   constructor(public statusCode: number, public extenderAd: {ad: string, beacons: string[]}, public error?: Error) {
    super(statusCode, extenderAd, error);
   }

}
