import { MessagingService } from 'enterprise_service_bus';
import AdRequester, { init, Response } from '../../src';

describe('test stub for adrequest', () => {
    beforeAll(async () => init());
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
