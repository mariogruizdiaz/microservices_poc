import { MessaginRequestSubjects } from "../../enums/enums";
import { BaseRequest } from "../BaseRequest";

export class BeaconRequest extends BaseRequest {

   constructor(public payload: string) {
    super(MessaginRequestSubjects.COMPOSE_BEACON, payload);
   }

}
