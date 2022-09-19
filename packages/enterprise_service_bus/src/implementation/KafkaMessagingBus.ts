import {
    MessaginPublishSubjects,
    MessaginRequestSubjects
} from '../enums/enums';
import IMessageBus from '../interfaces/IMessageBus';
import { IRequest } from '../interfaces/IRequest';
import { IResponse } from '../interfaces/IResponse';

export default class KafkaMessagingBus implements IMessageBus {
    name: string;
    constructor() {
        this.name = 'Kafka Messaging serevice';
    }
    init(serverUrl: string, clientServiceName: string): void {
        throw new Error('Method not implemented.');
    }
    publish(topic: string, payload: unknown): Promise<void> {
        throw new Error('Method not implemented.');
    }
    subscribe(
        serviceName: string,
        subject: string,
        callback: (err: unknown, msg: unknown) => void
    ): Promise<void> {
        throw new Error('Method not implemented.');
    }
    unsubscribe(subscriptionId: number): Promise<unknown> {
        throw new Error('Method not implemented.');
    }
    request(request: IRequest): Promise<IResponse> {
        throw new Error('Method not implemented.');
    }
}
