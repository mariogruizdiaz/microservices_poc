import { JSONValue } from 'enterprise_service_bus';

const INSTANCE_ID = `Beacon Builder ${process.env.INSTANCE_NAME}_${Math.floor(
    Math.random() * 100
)}`;

export type Response = string[];

export type Request = string;

async function getBeacons(req: JSONValue): Promise<Response> {
    const url = req as Request;

    console.log(
        `The service ${INSTANCE_ID} receives a new Request - PAYLOAD: ${url} ****************************************`
    );

    return [...Array(Math.floor(Math.random() * 5)).keys()].map(
        (n) => `Beacon #${n} from ${INSTANCE_ID} for the ad ${url}`
    );
}

export const serviceImplementation = getBeacons;

export { INSTANCE_ID as serviceName };
