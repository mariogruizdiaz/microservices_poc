import 'dotenv/config';
import { init, set } from 'service-common';
import { RequestSubject } from './enums/enums';
import { serviceImplementation, serviceName } from './services/adRequester';

(async () => {
    await init(process.env.NATS_SERVER_URL as string, serviceName);
    await set(RequestSubject.GetAds, serviceImplementation);
})();

export default { name: serviceName, RequestSubject };
export { Request, Response } from './services/adRequester';
