import { MessagingService } from '../../src/service/MessagingService';

describe('', () => {
    const NATS = 'nats://localhost:4222';
    const CHANNEL = 'CHANNEL';
    const SUBJECT = 'SUBJECT';
    beforeAll(async () => {
        await MessagingService.init(NATS, CHANNEL);
        await MessagingService.setResponseFor(CHANNEL, SUBJECT, (msg) => {
            if (msg == 'start') return Promise.resolve('end');
            throw new Error('Not proper request');
        });
    });
    afterAll(async () => MessagingService.close());
    test('basic message interactions', async () => {
        const res = await MessagingService.request(SUBJECT, 'start');
        expect(res).toBe(JSON.stringify('end'));
    }, 10000);
});
