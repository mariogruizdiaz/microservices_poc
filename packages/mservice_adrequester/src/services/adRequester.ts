import { JSONValue } from 'enterprise_service_bus';

const INSTANCE_ID = `adreq_${process.env.INSTANCE_NAME}_${Math.floor(
    Math.random() * 100
)}`;

export type Response = { ads: string[] };

async function implementation(req: JSONValue): Promise<Response> {
    console.log(
        `${INSTANCE_ID} received a new Request - PAYLOAD: ${req} ****************************************`
    );
    return {
        ads: [...Array(Math.floor(Math.random() * 20)).keys()].map(
            (n) => `Ad #${n} from ${INSTANCE_ID}.instance for the url ${req}`
        )
    };
}

export const serviceImplementation = implementation;

export { INSTANCE_ID as serviceName };
