import { ExecutionEvent, FwURlRequest } from "../../../data_model/build";
import { FwUrlResponse } from "../../../data_model/build";
import { MessagingService } from "enterprise_service_bus";

export class FwUrlBuilder {
    public static serviceName = "Fw Url Builder";
    public static INSTANCE_ID = `${process.env.INSTANCE_NAME}_${Math.floor(Math.random() * 100)}`;

    public static async serviceImplementation(err: unknown, msg: unknown) : Promise<void> 
    {
        if (err) return Promise.reject(err);

        // PubSub Use Case
        await MessagingService.publishEvent(FwUrlBuilder.serviceName, new ExecutionEvent({ serviceName: FwUrlBuilder.serviceName }));
        
        const message = msg as { data: FwURlRequest; reply: string; };

        console.log(`The service ${FwUrlBuilder.serviceName} receives a new Request - PAYLOAD: ${JSON.stringify( message.data )} ****************************************`);

        if (message.reply) {
            
            await MessagingService.response(FwUrlBuilder.serviceName, message.reply, new FwUrlResponse(200, "Everything OK", { fwURl: `https://url.build.by.${FwUrlBuilder.INSTANCE_ID}.instance`}))
            return Promise.resolve();

        }
        else{
            return Promise.reject(`Error sending request Message. Use "request" instead of "subscribe" for expecting a response of it. Message: ${JSON.stringify(message)}`);
        }
    
    }
}