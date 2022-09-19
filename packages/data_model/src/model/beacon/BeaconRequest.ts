import { MessaginRequestSubjects } from '../../enums/enums';
import { IRequest } from 'enterprise_service_bus';

export class BeaconRequest implements IRequest {
    public topic: string;

    constructor(public payload: { ad: string }) {
        this.topic = MessaginRequestSubjects.COMPOSE_BEACON;
    }
}
