import { MessaginRequestSubjects } from "../../enums/enums";
import { BaseRequest } from "../BaseRequest";

export class AdRequesterRequest extends BaseRequest {

   constructor(public payload: string) {
    super(MessaginRequestSubjects.GET_ADS, payload);
   }

}
