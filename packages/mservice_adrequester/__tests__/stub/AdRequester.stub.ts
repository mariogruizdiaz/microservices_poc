import {
    MessagingService,
    initializeRequestReplyPattern as init
} from 'enterprise_service_bus';
import AdRequester, { Response } from '../../src';
import { RequestSubject } from '../../src/enums/enums';
import {
    serviceName,
    serviceImplementation
} from '../../src/services/adRequester';
import 'dotenv/config';

describe('test stub for adrequest', () => {
    beforeAll(async () =>
        init(
            process.env.NATS_SERVER_URL as string,
            serviceName,
            RequestSubject.GetAds,
            serviceImplementation
        )
    );

    afterAll(async () => MessagingService.close());
    test('basic message interactions', async () => {
        const res = (await MessagingService.request(
            AdRequester.RequestSubject.GetAds,
            'test'
        )) as Response;
        expect(res).toBeDefined();
        expect(res.ads).toBeDefined();
        expect(res.ads.length <= 20).toBe(true);
    }, 10000);
});
