import { IRequest } from 'enterprise_service_bus';
import { MessaginRequestSubjects } from '../../enums/enums';
import ITraceable from '../../interfaces/ITraceable';

export class AdRequesterRequest implements IRequest {
    public topic: string;
    constructor(public payload: { urlRequest: string }) {
        this.topic = MessaginRequestSubjects.GET_ADS;
    }
}
