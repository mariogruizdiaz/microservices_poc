import 'dotenv/config';
import Orchestrator from './servicesOrchestrator';

const SERVICE_NAME = 'µ Service Ad Requester';

Orchestrator.init()
    .then(() =>
        console.log(`The ${SERVICE_NAME} was initialized successfully!`)
    )
    .catch((e) => {
        console.error(e);
        console.log(`It was not possible to intialize the ${SERVICE_NAME}`);
    });
