/* eslint-disable @typescript-eslint/no-unused-vars */
import IMessageBus, {
    JSONValue,
    MessageCallback
} from '../interfaces/IMessageBus';

export default class KafkaMessagingBus implements IMessageBus {
    name: string;
    constructor() {
        this.name = 'Kafka Messaging serevice';
    }
    init(serverUrl: string, clientServiceName: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    publish(subject: string, payload: JSONValue): Promise<void> {
        throw new Error('Method not implemented.');
    }
    subscribe(
        serviceName: string,
        subject: string,
        callback: MessageCallback
    ): Promise<void> {
        throw new Error('Method not implemented.');
    }
    unsubscribe(subscriptionId: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    request(subject: string, payload: JSONValue): Promise<JSONValue> {
        throw new Error('Method not implemented.');
    }

    close(): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
