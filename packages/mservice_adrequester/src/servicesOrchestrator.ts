import { MessaginRequestSubjects } from "enterprise_service_bus";
import { MessagingService } from "enterprise_service_bus";
import { AdRequester } from "./services/adRequester";

export default class Orchestrator
{
    private static _instance : Orchestrator = new Orchestrator();

    constructor() {
        if(Orchestrator._instance){
            throw new Error("Error: Instantiation failed: Use Orchestrator.getInstance() instead of new.");
        }
        
        Orchestrator._instance = this;
    }

    public static async init() : Promise<void> {

        await MessagingService.init(process.env.NATS_SERVER_URL as string, AdRequester.serviceName);

        await MessagingService.subscribe(AdRequester.serviceName, MessaginRequestSubjects.GET_ADS, AdRequester.serviceImplementation);
        console.log(`${AdRequester.serviceName} Listener ready!`);
    }
}