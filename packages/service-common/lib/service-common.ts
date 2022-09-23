import { JSONValue, MessagingService } from 'enterprise_service_bus';
import { Subject, StartToken, InvokeToken } from 'metrics';

async function init(serverUrl: string, name: string): Promise<void> {
    await MessagingService.init(serverUrl, name);
    const startToken: StartToken = { name, ts: Date.now() };
    return MessagingService.publish(Subject.Start, startToken);
}

async function request<Res extends JSONValue, Req extends JSONValue>(
    subject: string,
    req: Req
): Promise<Res> {
    const res = (await MessagingService.request(subject, req)) as Res;
    const invokeToken: InvokeToken = {
        from: MessagingService.clientServiceName,
        subject
    };
    await MessagingService.publish(Subject.Invoke, invokeToken);
    return res;
}

type AsyncJSONValueMorph = (req: JSONValue) => Promise<JSONValue>;

async function setResponseFor(
    subscriptoService: string,
    subject: string,
    callback: AsyncJSONValueMorph
): Promise<void> {
    return MessagingService.subscribe(
        subscriptoService,
        subject,
        (msg, reply) => {
            if (!reply)
                throw new Error(
                    `${subscriptoService} reply not supplied by ${subject}`
                );
            callback(msg)
                .then((res) => MessagingService.response(reply, res))
                .catch((e) =>
                    console.error(
                        `Error during ${subscriptoService} ${subject} response`,
                        e
                    )
                );
        }
    );
}

async function set(subject: string, impl: AsyncJSONValueMorph): Promise<void> {
    await setResponseFor(MessagingService.serverUrl, subject, impl);
    console.log(`${subject} on ${MessagingService.serverUrl} Listener ready!`);
    console.log(
        `The ${subject} on ${MessagingService.serverUrl} was initialized successfully!`
    );
}

async function close(): Promise<void> {
    return MessagingService.close();
}

type AsyncJSONAction = (payload: JSONValue) => Promise<void>;

async function receive(subject: string, impl: AsyncJSONAction): Promise<void> {
    return MessagingService.subscribe(
        MessagingService.serverUrl,
        subject,
        (msg) =>
            impl(msg).catch((e) =>
                console.error(
                    `Error during ${MessagingService.serverUrl} ${subject} receive`,
                    e
                )
            )
    );
}

export { JSONValue, init, request, set, close, receive };
