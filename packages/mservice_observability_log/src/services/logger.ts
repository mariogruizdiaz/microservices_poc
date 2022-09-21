import { ExecutionEventPayload } from "../../../data_model/build";


export class Logger {
    public static serviceName = "Logger";
    public static INSTANCE_ID = `${Logger.serviceName}_${process.env.INSTANCE_NAME}_${Math.floor(Math.random() * 100)}`;

    public static async serviceImplementation(err: unknown, msg: unknown): Promise<void> {
        if (err) return Promise.reject(err);

        const message = msg as { data: string };

        const payload = JSON.parse(message.data) as ExecutionEventPayload;

        console.log(`The service ${Logger.serviceName} receives a new Request - PAYLOAD: ${JSON.stringify(message)} ****************************************`);

        console.log(`🚀🚀🚀🚀🚀 The service '${payload.serviceName}' was executed!`);

    }
}