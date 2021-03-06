import { MessaginRequestSubjects } from "mservices_toolkit/lib/enterprise_service_bus/enums/enums";
import { MessagingService } from "mservices_toolkit/lib/enterprise_service_bus/service/MessagingService";
import { FwUrlBuilder } from "./services/fwUrlBuilder";


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

        await MessagingService.init(process.env.NATS_SERVER_URL as string, FwUrlBuilder.serviceName);

        await MessagingService.subscribe(FwUrlBuilder.serviceName, MessaginRequestSubjects.COMPOSE_FW_URL, FwUrlBuilder.serviceImplementation);
        console.log(`${FwUrlBuilder.serviceName} Listener ready!`);
    }
}