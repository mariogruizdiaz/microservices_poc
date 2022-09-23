import 'dotenv/config';
import { init, set } from 'service-common';
import { RequestSubject } from './enums/enums';
import { serviceImplementation, serviceName } from './services/beaconBuilder';

(async () => {
    await init(process.env.NATS_SERVER_URL as string, serviceName);
    await set(RequestSubject.ComposeBeacon, serviceImplementation);
})();
