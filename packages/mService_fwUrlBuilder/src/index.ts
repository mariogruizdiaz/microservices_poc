import 'dotenv/config';
import { init, set } from 'service-common';
import { RequestSubject } from './enums/enums';
import { serviceImplementation, serviceName } from './services/fwUrlBuilder';

(async () => {
    await init(process.env.NATS_SERVER_URL as string, serviceName);
    await set(RequestSubject.ComposeFreewheelURL, serviceImplementation);
})();

export default { name: serviceName, RequestSubject };
export { Request, Response } from './services/fwUrlBuilder';
