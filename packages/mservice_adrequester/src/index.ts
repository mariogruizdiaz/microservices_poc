import 'dotenv/config';
import { initializeRequestReplyPattern as init } from 'enterprise_service_bus';
import { RequestSubject } from './enums/enums';
import {
    serviceImplementation,
    serviceName,
    Response
} from './services/adRequester';

Promise.resolve(
    init(
        process.env.NATS_SERVER_URL as string,
        serviceName,
        RequestSubject.GetAds,
        serviceImplementation
    )
);

export default { name: serviceName, RequestSubject };
export { Response };
