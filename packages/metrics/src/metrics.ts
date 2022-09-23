import { writeFileSync } from 'fs';

const NAME = 'metrics log';

type StartToken = { name: string; ts: number };

async function startImplementation(req: StartToken): Promise<void> {
    console.log(
        `The service ${req.name} started on ${new Date(req.ts).toISOString()}`
    );
    writeFileSync(
        './metrics.log',
        `The service ${req.name} started on ${new Date(
            req.ts
        ).toISOString()}\n`,
        { flag: 'as' }
    );
}

type InvokeToken = { from: string; subject: string };

const count = new Map<string, number>();

function increment(key: string): number {
    const val = count.get(key);
    const n: number = val == undefined ? 0 : val;
    count.set(key, n + 1);
    return n + 1;
}

async function invokeImplementation(req: InvokeToken): Promise<void> {
    const n = increment(req.from + req.subject);
    console.log(
        `The service ${req.from} requested for ${req.subject}, now ${n} times`
    );
    writeFileSync(
        './metrics.log',
        `The service ${req.from} requested for ${req.subject}, now ${n} times\n`,
        { flag: 'as' }
    );
}

export {
    NAME as serviceName,
    StartToken,
    startImplementation,
    InvokeToken,
    invokeImplementation
};
