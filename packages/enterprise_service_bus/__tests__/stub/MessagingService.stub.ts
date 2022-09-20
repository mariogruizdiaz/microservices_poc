import { MessagingService } from '../../src/service/MessagingService';

describe('', () => {
    const NATS = 'nats://localhost:4222';
    const CHANNEL = 'CHANNEL';
    const SUBJECT = 'SUBJECT';
    beforeAll(async () => {
        await MessagingService.init(NATS, CHANNEL);
        await MessagingService.subscribe(CHANNEL, SUBJECT, (msg, reply) => {
            if (!reply) throw new Error('reply not supplied by callback');
            return msg == 'start'
                ? MessagingService.response(reply, 'end')
                : undefined;
        });
    });
    afterAll(async () => MessagingService.close());
    test('basic message interactions', async () => {
        const res = await MessagingService.request(SUBJECT, 'start');
        expect(res).toBe(JSON.stringify('end'));
    }, 10000);
});
