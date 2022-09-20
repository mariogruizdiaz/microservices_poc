import NatsMessagingBus from '../implementation/NatsMessageBus';
import IMessageBus, {
    JSONValue,
    MessageCallback
} from '../interfaces/IMessageBus';

class MessagingService {
    //#region Fields

    private static _instance: MessagingService = new MessagingService();
    private _messagingClient!: IMessageBus;
    private _name!: string;

    //#endregion Fields

    //#region Constructors and Public

    constructor() {
        if (MessagingService._instance) {
            throw new Error(
                'Error: Instantiation failed: Use NatsMessagingBus.getInstance() instead of new.'
            );
        }

        MessagingService._instance = this;
    }

    public static async init(
        serverUrl: string,
        clientServiceName: string
    ): Promise<void> {
        this.getInstance()._messagingClient = new NatsMessagingBus();
        this.getInstance()._name = clientServiceName;
        await this.getInstance()._messagingClient.init(
            serverUrl,
            clientServiceName
        );
    }

    public static async publish(
        subject: string,
        payload: JSONValue
    ): Promise<void> {
        await this.getInstance()._messagingClient.publish(subject, payload);
        console.log(
            `${
                this.getInstance()._name
            } has published: ${subject} ****************************************`
        );
    }

    public static async response(
        subject: string,
        payload: JSONValue
    ): Promise<void> {
        await this.getInstance()._messagingClient.publish(subject, payload);
        console.log(
            `${
                this.getInstance()._name
            } has replied: to ${subject} ****************************************`
        );
    }

    public static async subscribe(
        subscriptoService: string,
        subject: string,
        callback: MessageCallback
    ): Promise<void> {
        await this.getInstance()._messagingClient.subscribe(
            subscriptoService,
            subject,
            callback
        );
        console.log(
            `${subscriptoService} has been subcripted to ${subject} - OK! ****************************************`
        );
    }

    public static async request(
        subject: string,
        payload: JSONValue
    ): Promise<JSONValue> {
        const requester = this.getInstance()._name;
        console.log(
            `Caller: ${requester} sent a request for the Topic: ${subject}. Payload: ${payload}
             ****************************************`
        );
        const start = Date.now();

        const response = await this.getInstance()._messagingClient.request(
            subject,
            payload
        );

        console.log(
            `Caller: ${requester} got the response for the Topic: ${subject} in ${
                Date.now() - start
            }ms ****************************************`
        );
        return Promise.resolve(response);
    }

    //#endregion Constructors and Public

    //#region Private

    private static getInstance(): MessagingService {
        return MessagingService._instance;
    }

    //#endregion Private

    public static async close(): Promise<void> {
        return this.getInstance()._messagingClient.close();
    }
}

export { MessagingService };
