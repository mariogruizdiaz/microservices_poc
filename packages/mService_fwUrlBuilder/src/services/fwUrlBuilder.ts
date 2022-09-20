import { JSONValue } from 'enterprise_service_bus';

const INSTANCE_ID = `Fw Url Builder ${process.env.INSTANCE_NAME}_${Math.floor(
    Math.random() * 100
)}`;

export type Response = { fwURl: string };

export type Request = { params: number[] };

async function serviceImplementation(req: JSONValue): Promise<Response> {
    const obj = req as Request;

    console.log(
        `The service ${INSTANCE_ID} receives a new Request - PAYLOAD: ${obj} ****************************************`
    );
    return {
        fwURl: `https://url.build.by.${INSTANCE_ID}.instance`
    };
}

export { serviceImplementation, INSTANCE_ID as serviceName };
