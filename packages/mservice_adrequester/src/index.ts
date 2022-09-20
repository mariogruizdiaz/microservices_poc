import 'dotenv/config';
import { MessagingService } from 'enterprise_service_bus';
import { RequestSubject } from './enums/enums';
import {
    serviceImplementation,
    serviceName,
    Response
} from './services/adRequester';
const SERVICE_NAME = 'µ Service Ad Requester';

async function init(): Promise<void> {
    try {
        await MessagingService.init(
            process.env.NATS_SERVER_URL as string,
            serviceName
        );

        await MessagingService.setResponseFor(
            serviceName,
            RequestSubject.GetAds,
            serviceImplementation
        );
        console.log(`${serviceName} Listener ready!`);
        console.log(`The ${SERVICE_NAME} was initialized successfully!`);
    } catch (e) {
        console.error(e);
        console.log(`It was not possible to intialize the ${SERVICE_NAME}`);
    }
}

Promise.resolve(init());

export default { name: serviceName, RequestSubject };
export { init, Response };
