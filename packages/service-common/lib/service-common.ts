import { JSONValue, MessagingService } from 'enterprise_service_bus';

async function init(serverUrl: string, name: string): Promise<void> {
    return MessagingService.init(serverUrl, name);
}

async function request<Res extends JSONValue, Req extends JSONValue>(
    subject: string,
    req: Req
): Promise<Res> {
    return (await MessagingService.request(subject, req)) as Res;
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

export { JSONValue, init, request, set, close };
