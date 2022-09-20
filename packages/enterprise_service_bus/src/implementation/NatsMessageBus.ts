import IMessageBus, {
    JSONValue,
    MessageCallback
} from '../interfaces/IMessageBus';
import {
    Client,
    connect,
    MsgCallback as NatsMsgCallback,
    Payload
} from 'ts-nats';

function withCallbackModified(callback: MessageCallback): NatsMsgCallback {
    return (err, msg) => {
        if (err) {
            console.error(err);
            return;
        }
        try {
            callback(msg.data, msg.reply);
        } catch (err2) {
            console.error(err2);
        }
    };
}

export default class NatsMessagingBus implements IMessageBus {
    //#region Fields

    private _natsClient: Client = new Client();
    private _timeout = 5 * 1000;

    //#endregion Fields

    name: string;
    constructor() {
        this.name = 'Nats Messaging serevice';
    }

    async init(serverUrl: string, clientServiceName: string): Promise<void> {
        const start = new Date();
        this._natsClient = await connect({
            url: `${serverUrl}`,
            payload: Payload.JSON
        });
        this._natsClient.on('connect', () => {
            console.log(
                `${clientServiceName} connected to Nats server in: ${
                    new Date().valueOf() - start.valueOf()
                }ms`
            );
        });
        this._natsClient.on('close', () => {
            console.log(`Stopped`);
        });
        this._natsClient.on('error', (e) => {
            const msg = 'Error connecting to NATS';
            console.log(msg, e);
            console.error(msg, e);
        });
        await delay(1000);
        return Promise.resolve();
    }

    async publish(subject: string, payload: JSONValue): Promise<void> {
        this._natsClient.publish(subject, JSON.stringify(payload));
    }

    async request(subject: string, payload: JSONValue): Promise<JSONValue> {
        const responseMsg = await this._natsClient.request(
            subject,
            this._timeout,
            payload
        );
        return responseMsg.data;
    }

    async subscribe(
        serviceName: string,
        subject: string,
        callback: MessageCallback
    ): Promise<void> {
        return this._natsClient
            .subscribe(subject, withCallbackModified(callback), {
                queue: serviceName.replace(new RegExp(' ', 'g'), '')
            })
            .then();
    }

    unsubscribe(subscriptionId: number): Promise<void> {
        return Promise.resolve();
    }

    close(): Promise<void> {
        this._natsClient.close();
        return Promise.resolve();
    }
}

const delay = (ms: number | undefined) =>
    new Promise((resolve) => setTimeout(resolve, ms));
