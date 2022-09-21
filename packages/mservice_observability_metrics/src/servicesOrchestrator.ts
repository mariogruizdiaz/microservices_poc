import { MessaginPublishSubjects } from "enterprise_service_bus";
import { MessagingService } from "enterprise_service_bus";
import { Metrics } from "./services/metrics";

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

        await MessagingService.init(process.env.NATS_SERVER_URL as string, Metrics.serviceName);

        await MessagingService.subscribe(Metrics.serviceName, MessaginPublishSubjects.SERVICES_STARTED, Metrics.serviceImplementation);
        console.log(`${Metrics.serviceName} Listener ready!`);
    }
}