import { IResponse } from 'enterprise_service_bus';

export class BeaconResponse implements IResponse {
    constructor(
        public statusCode: number,
        public statusDescription: string,
        public payload: { ad: string; beacons: string[] }
    ) {}
}
