import { MessaginRequestSubjects } from "enterprise_service_bus";
import { MessagingService } from "enterprise_service_bus";
import { BeaconBuilder } from "./services/beaconBuilder";

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

        await MessagingService.init(process.env.NATS_SERVER_URL as string, BeaconBuilder.serviceName);

        await MessagingService.subscribe(BeaconBuilder.serviceName, MessaginRequestSubjects.COMPOSE_BEACON, BeaconBuilder.serviceImplementation);
        console.log(`${BeaconBuilder.serviceName} Listener ready!`);
    }
}