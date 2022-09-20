export default interface IMessageBus {
    name: string;

    init(serverUrl: string, clientServiceName: string): Promise<void>;

    publish(subject: string, payload: JSONValue): Promise<void>;

    subscribe(
        serviceName: string,
        subject: string,
        callback: MessageCallback
    ): Promise<void>;

    unsubscribe(subscriptionId: number): Promise<void>;

    request(subject: string, payload: JSONValue): Promise<JSONValue>;

    close(): Promise<void>;
}

export type JSONValue = string | number | true | false | null | JSON[] | JSON;

export type MessageCallback = (msg: JSONValue, reply?: string) => void;
