import { FwURlRequest, MessagingService, FwUrlResponse } from "mservices_toolkit";


export class FwUrlBuilder {
    public static serviceName = "Fw Url Builder";
    public static INSTANCE_ID = `${process.env.INSTANCE_NAME}_${Math.floor(Math.random() * 100)}`;

    public static async serviceImplementation(err: unknown, msg: unknown) : Promise<void> 
    {
        if (err) return Promise.reject(err);
        const message = msg as { data: FwURlRequest; reply: string; };

        console.log(`The service ${FwUrlBuilder.serviceName} receives a new Request - PAYLOAD: ${JSON.stringify( message.data )} ****************************************`);

        if (message.reply) {
            
            await MessagingService.response(FwUrlBuilder.serviceName, message.reply, new FwUrlResponse(200, `https://url.build.by.${FwUrlBuilder.INSTANCE_ID}.instance`))
            return Promise.resolve();

        }
        else{
            return Promise.reject(`Error sending request Message. Use "request" instead of "subscribe" for expecting a response of it. Message: ${JSON.stringify(message)}`);
        }
    
    }
}