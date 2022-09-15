import {
    AdRequesterRequest,
    MessagingService,
    AdRequesterResponse
} from 'enterprise_service_bus';

const SERVICE_NAME = 'AdRequester';
const INSTANCE_ID = `adreq_${process.env.INSTANCE_NAME}_${Math.floor(
    Math.random() * 100
)}`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Last<T extends unknown[]> = T extends [...infer I, infer L] ? L : never;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Init<T extends unknown[]> = T extends [...infer I, infer L] ? I : never;

type Morph<Ts extends unknown[]> = (...args: [...Init<Ts>]) => Last<Ts>;

type Callback<E, A, R> = Morph<[E, A, R]>;

function withCallBackErrorHandled<E, A, R>(
    f: Callback<E, A, R>
): Callback<E, A, R> {
    return (err: E, a: A) => {
        if (err) throw err;
        return f(err, a);
    };
}

async function impl(_: unknown, msg: unknown): Promise<void> {
    const message = msg as { data: AdRequesterRequest; reply: string };

    console.log(
        `The service ${SERVICE_NAME} receives a new Request - PAYLOAD: ${JSON.stringify(
            message
        )} ****************************************`
    );

    if (!message.reply)
        throw `Error sending request Message. Use "request" instead of "publish" for expecting a response of it. Message: ${JSON.stringify(
            message
        )}`;
    let adNumber = 0;

    const ads = [];
    const total = Math.floor(Math.random() * 20);

    for (let i = 0; i < total; i++) {
        ads.push(
            `Ad #${++adNumber} from ${INSTANCE_ID}.instance for the url ${
                message.data
            }`
        );
    }

    return MessagingService.response(
        SERVICE_NAME,
        message.reply,
        new AdRequesterResponse(200, ads)
    );
}

export const AdRequester = {
    serviceName: SERVICE_NAME,
    serviceImplementation: withCallBackErrorHandled(impl)
};
