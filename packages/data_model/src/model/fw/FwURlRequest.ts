import { IRequest } from "enterprise_service_bus";
import { MessaginRequestSubjects } from "../../enums/enums";

export class FwURlRequest implements IRequest {

    public topic: string;

    constructor(public payload: {params: unknown[]}) {
        this.topic = MessaginRequestSubjects.COMPOSE_FW_URL;
    }
}
