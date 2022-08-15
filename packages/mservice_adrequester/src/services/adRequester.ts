import { AdRequesterRequest, MessagingService, AdRequesterResponse } from "enterprise_service_bus";


export class AdRequester {
    public static serviceName = "AdRequester";
    public static INSTANCE_ID = `adreq_${process.env.INSTANCE_NAME}_${Math.floor(Math.random() * 100)}`;

    public static async serviceImplementation(err: unknown, msg: unknown): Promise<void> {
        if (err) return Promise.reject(err);
        const message = msg as { data: AdRequesterRequest; reply: string; };

        console.log(`The service ${AdRequester.serviceName} receives a new Request - PAYLOAD: ${JSON.stringify(message)} ****************************************`);


        if (message.reply) {

            let adNumber = 0;

            const ads = [];
            const total = Math.floor(Math.random() * 20);

            for (let i = 0; i < total; i++) {
                ads.push(`Ad #${++adNumber} from ${AdRequester.INSTANCE_ID}.instance for the url ${message.data}`);
            }


            MessagingService.response(AdRequester.serviceName, message.reply, new AdRequesterResponse(200, ads));
            return Promise.resolve();

        }
        else {
            return Promise.reject(`Error sending request Message. Use "request" instead of "subscribe" for expecting a response of it. Message: ${JSON.stringify(message)}`);
        }

    }
}