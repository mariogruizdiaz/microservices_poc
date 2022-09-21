import { MessaginPublishSubjects, MessaginRequestSubjects } from '../enums/enums';
import NatsMessagingBus from '../implementation/NatsMessageBus';
import { IEvent } from '../interfaces/IEvent';
import IMessageBus from '../interfaces/IMessageBus';
import { IRequest } from '../interfaces/IRequest';
import { IResponse } from '../interfaces/IResponse';


export class MessagingService {

    //#region Fields

    private static _instance: MessagingService = new MessagingService();
    private _messagingClient!: IMessageBus;

    //#endregion Fields

    //#region Constructors and Public 

    constructor() {
        if (MessagingService._instance) {
            throw new Error("Error: Instantiation failed: Use NatsMessagingBus.getInstance() instead of new.");
        }

        MessagingService._instance = this;
    }

    public static async init(serverUrl: string, clientServiceName: string): Promise<void> {
        this.getInstance()._messagingClient = new NatsMessagingBus();
        await this.getInstance()._messagingClient.init(serverUrl, clientServiceName);
    }


    public static async publish(publisher: string, topic: string, payload: unknown): Promise<void> {
        await this.getInstance()._messagingClient.publish(topic, payload);
        console.log(`${publisher} has published: ${topic} ****************************************`);

    }

    public static async publishEvent(publisher: string, event: IEvent): Promise<void> {
        await this.getInstance()._messagingClient.publish(event.topic, event.payload);
        console.log(`${publisher} has published: ${event.topic} ****************************************`);

    }

    public static async response(replier: string, topic: string, payload: unknown): Promise<void> {
        await this.getInstance()._messagingClient.publish(topic, payload);
        console.log(`${replier} has replied: to ${topic} ****************************************`);

    }

    public static async subscribe(subscriptoService: string, subject: MessaginRequestSubjects | MessaginPublishSubjects, callback: (err: unknown, msg: unknown) => void): Promise<void> {
        await this.getInstance()._messagingClient.subscribe(subscriptoService, subject, async (err, msg) => {
            await callback(err, msg);

        });
        console.log(`${subscriptoService} has been subcripted to ${subject} - OK! ****************************************`);
    }

    public static async request(requester: string, request: IRequest): Promise<IResponse> {
        console.log(`Caller: ${requester} sent a request for the Topic: ${request.topic}. Payload: ${JSON.stringify(request.payload)} ****************************************`);
        const start = new Date();

        const response = await this.getInstance()._messagingClient.request(request);

        console.log(`Caller: ${requester} got the response for the Topic: ${request.topic} in ${new Date().valueOf() - start.valueOf()}ms ****************************************`);
        return Promise.resolve(response);
    }


    //#endregion Constructors and Public

    //#region Private

    private static getInstance(): MessagingService {
        return MessagingService._instance;
    }



    //#endregion Private

}