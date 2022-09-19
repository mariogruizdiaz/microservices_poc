import { IResponse } from 'enterprise_service_bus';

export class AdRequesterResponse implements IResponse {
    constructor(
        public statusCode: number,
        public statusDescription: string,
        public payload: { ads: string[] }
    ) {}
}
