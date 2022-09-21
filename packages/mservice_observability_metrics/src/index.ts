import 'dotenv/config';
import Orchestrator from "./servicesOrchestrator";

const SERVICE_NAME = "µ Service Observability"
async function init(): Promise<boolean> {
    try{
        await Orchestrator.init();
        return Promise.resolve(true);
    } catch (e) {
        console.error(e);
        return Promise.resolve(false);
    }
    
    
  }
   
init().then(response => {
    if (response) console.log(`The ${SERVICE_NAME} was initialized successfully!`);
    else console.log(`It was not possible to intialize the ${SERVICE_NAME}`);
});