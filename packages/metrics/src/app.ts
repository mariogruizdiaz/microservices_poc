import 'dotenv/config';
import { Subject } from './subject';
import {
    invokeImplementation,
    InvokeToken,
    serviceName,
    startImplementation,
    StartToken
} from './metrics';
import { MessagingService } from 'enterprise_service_bus';

(async () => {
    const serverUrl = process.env.NATS_SERVER_URL as string;

    await MessagingService.init(serverUrl, serviceName);
    await MessagingService.subscribe(serverUrl, Subject.Start, (msg) =>
        Promise.resolve(
            startImplementation(msg as StartToken).catch((e) =>
                console.error(
                    `Error during ${serviceName} on ${MessagingService.serverUrl} for ${Subject.Start}`,
                    e
                )
            )
        )
    );
    await MessagingService.subscribe(serverUrl, Subject.Invoke, (msg) =>
        Promise.resolve(
            invokeImplementation(msg as InvokeToken).catch((e) =>
                console.error(
                    `Error during ${serviceName} on ${MessagingService.serverUrl} for ${Subject.Invoke}`,
                    e
                )
            )
        )
    );
})();
