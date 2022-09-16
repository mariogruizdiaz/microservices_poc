import { BaseRequest } from "enterprise_service_bus";
import { MessaginRequestSubjects } from "../../enums/enums";

export class AdRequesterRequest extends BaseRequest {

   constructor(public payload: string) {
    super(MessaginRequestSubjects.GET_ADS, payload);
   }

}
