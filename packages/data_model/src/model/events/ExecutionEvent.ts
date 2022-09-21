import { IEvent } from "enterprise_service_bus";
import { MessaginPublishSubjects } from "../../enums/enums";

export class ExecutionEvent implements IEvent {
    public topic: string;
    constructor(public payload: ExecutionEventPayload ){
        this.topic = MessaginPublishSubjects.SERVICES_STARTED;
    }
    
}

export class ExecutionEventPayload {
    constructor(public serviceName: string  ){}
}
