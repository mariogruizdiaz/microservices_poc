import { MessaginPublishSubjects, MessaginRequestSubjects } from "../enums/enums";
import IMessageBus from "../interfaces/IMessageBus";
import { Client, connect } from 'ts-nats';
import { IRequest } from "../interfaces/IRequest";
import { IResponse } from "../interfaces/IResponse";
import { IEvent } from "../interfaces/IEvent";

export default class NatsMessagingBus implements IMessageBus {

    //#region Fields
    
    private _natsClient : Client = new Client;
    private _timeout = 5 * 1000;

    //#endregion Fields

    name: string;
    constructor() {
        this.name = "Nats Messaging serevice";
    }
    
    
    async init(serverUrl: string, clientServiceName: string): Promise<void> {
        const start = new Date();
        this._natsClient = await connect({'url':`${serverUrl}`});
        this._natsClient.on('connect', () => {
            console.log(`${clientServiceName} connected to Nats server in: ${new Date().valueOf() - start.valueOf()}ms`);
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

    async publish(topic: string, payload: unknown): Promise<void> {
        this._natsClient.publish(topic, JSON.stringify(payload));
    }

    async publishEvent(event: IEvent): Promise<void>{
        this._natsClient.publish(event.topic, JSON.stringify(event.payload));
    }
    
    async request(request: IRequest): Promise<IResponse> {

        const responseMsg = await this._natsClient.request(request.topic, this._timeout, JSON.stringify(request.payload));
        return Promise.resolve(JSON.parse(responseMsg.data));
    }

    async subscribe(serviceName: string, subject: string, callback: (err: unknown, msg: unknown) => void): Promise<void> {

        await this._natsClient.subscribe(subject, callback, { queue: serviceName.replace(new RegExp(' ', 'g'), '') });

    }
    unsubscribe(subscriptionId: number): Promise<unknown> {

        return Promise.resolve(subscriptionId);

    }
}

const delay = (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms))