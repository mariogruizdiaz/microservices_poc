import { BaseRequest } from "enterprise_service_bus";
import { MessaginRequestSubjects } from "../../enums/enums";

export class FwURlRequest extends BaseRequest {

   constructor(public payload: { params: unknown[]}) {
    super(MessaginRequestSubjects.COMPOSE_FW_URL, payload);
   }

}
