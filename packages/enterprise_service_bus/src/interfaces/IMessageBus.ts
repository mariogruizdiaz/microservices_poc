import { IRequest } from './IRequest';
import { IResponse } from './IResponse';

export default interface IMessageBus {
    name: string;

    init(serverUrl: string, clientServiceName: string): void;

    publish(topic: string, payload: unknown): Promise<void>;

    subscribe(
        serviceName: string,
        subject: string,
        callback: (err: unknown, msg: unknown) => void
    ): Promise<void>;

    unsubscribe(subscriptionId: number): Promise<unknown>;

    request(request: IRequest): Promise<IResponse>;
}
