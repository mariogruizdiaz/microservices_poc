import { MessaginPublishSubjects, MessaginRequestSubjects } from '../enums/enums';
import { BaseRequest } from '../model/BaseRequest';
import { BaseResponse } from '../model/BaseResponse';

export default interface IMessageBus {

    name : string

    init(serverUrl: string, clientServiceName: string):void;
    
    publish(subject: MessaginPublishSubjects  | string, payload: unknown) : Promise<void>;

    subscribe(serviceName: string, subject: MessaginPublishSubjects | MessaginRequestSubjects, callback: (err: unknown, msg: unknown) => void) : Promise<unknown>;

    unsubscribe(subscriptionId: number):Promise<unknown>;

    request(request: BaseRequest ) : Promise<BaseResponse>;

}
