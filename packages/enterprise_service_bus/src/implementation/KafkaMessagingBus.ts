import { MessaginPublishSubjects, MessaginRequestSubjects } from "../enums/enums";
import IMessageBus from "../interfaces/IMessageBus";
import { BaseRequest } from "../model/BaseRequest";
import { BaseResponse } from "../model/BaseResponse";

export default class KafkaMessagingBus implements IMessageBus {
    name: string;
    constructor() {

        this.name = "Kafka Messaging serevice";
    }
    init(serverUrl: string, clientServiceName: string): void {
        throw new Error("Method not implemented.");
    }
    publish(subject: string, payload: unknown): Promise<void> {
        throw new Error("Method not implemented.");
    }
    subscribe(serviceName: string, subject: MessaginPublishSubjects | MessaginRequestSubjects, callback: (err: unknown, msg: unknown) => void): Promise<unknown> {
        throw new Error("Method not implemented.");
    }
    unsubscribe(subscriptionId: number): Promise<unknown> {
        throw new Error("Method not implemented.");
    }
    request(request: BaseRequest): Promise<BaseResponse> {
        throw new Error("Method not implemented.");
    }

}