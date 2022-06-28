import { MessaginRequestSubjects } from "../../enums/enums";
import { BaseRequest } from "../BaseRequest";

export class FwURlRequest extends BaseRequest {

   constructor(public payload: { params: unknown[]}) {
    super(MessaginRequestSubjects.COMPOSE_FW_URL, payload);
   }

}
