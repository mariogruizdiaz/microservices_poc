import { MessaginPublishSubjects, MessaginRequestSubjects } from '../enums/enums';
import NatsMessagingBus from '../implementation/NatsMessageBus';
import IMessageBus from '../interfaces/IMessageBus';
import { BaseRequest } from '../model/BaseRequest';
import { BaseResponse } from '../model/BaseResponse';


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


    public static async publish(publisher: string, subject: MessaginPublishSubjects | string, payload: unknown): Promise<void> {
        await this.getInstance()._messagingClient.publish(subject, payload);
        console.log(`${publisher} has published: ${subject} ****************************************`);

    }

    public static async response(replier: string, subject: MessaginPublishSubjects | string, payload: unknown): Promise<void> {
        await this.getInstance()._messagingClient.publish(subject, payload);
        console.log(`${replier} has replied: to ${subject} ****************************************`);

    }

    public static async subscribe(subscriptoService: string, subject: MessaginRequestSubjects | MessaginPublishSubjects, callback: (err: unknown, msg: unknown) => void): Promise<void> {
        await this.getInstance()._messagingClient.subscribe(subscriptoService, subject, async (err, msg) => {
            await callback(err, msg);

        });
        console.log(`${subscriptoService} has been subcripted to ${subject} - OK! ****************************************`);
    }

    public static async request(requester: string, request: BaseRequest): Promise<BaseResponse> {
        console.log(`Caller: ${requester} sent a request for the Subject: ${request.subject}. Payload: ${JSON.stringify(request.payload)} ****************************************`);
        const start = new Date();

        const response = await this.getInstance()._messagingClient.request(request);

        console.log(`Caller: ${requester} got the response for the Subject: ${request.subject} in ${new Date().valueOf() - start.valueOf()}ms ****************************************`);
        return Promise.resolve(response);
    }


    //#endregion Constructors and Public

    //#region Private

    private static getInstance(): MessagingService {
        return MessagingService._instance;
    }



    //#endregion Private

}