import { MessagingService } from "enterprise_service_bus";
import { ExecutionEvent, ExecutionEventPayload } from "../../../data_model/build";

let counter = 0;
export class Metrics {
    public static serviceName = "Metrics";
    public static INSTANCE_ID = `${Metrics.serviceName}_${process.env.INSTANCE_NAME}_${Math.floor(Math.random() * 100)}`;

    public static async serviceImplementation(err: unknown, msg: unknown): Promise<void> {
        if (err) return Promise.reject(err);

        counter++;

        const message = msg as { data: string };

        const payload = JSON.parse(message.data) as ExecutionEventPayload;

        console.log(`The service ${Metrics.serviceName} receives a new Request - PAYLOAD: ${JSON.stringify(message)} ****************************************`);

        console.log(`🐯🐯🐯🐯🐯🐯 The service '${payload.serviceName}' was executed again. Total executions: ${counter}!`);

    }
}