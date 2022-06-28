import { MessagingService, BeaconResponse } from "mservices_toolkit";


export class BeaconBuilder {
    public static serviceName = "Beacon Builder";
    public static INSTANCE_ID = `${process.env.INSTANCE_NAME}_${Math.floor(Math.random() * 100)}`;

    public static async serviceImplementation(err: unknown, msg: unknown): Promise<void> {
        if (err) return Promise.reject(err);
        const message = msg as { data: string; reply: string; };
        

        console.log(`The service ${BeaconBuilder.serviceName} receives a new Request - PAYLOAD: ${message.data} ****************************************`);

        if (message.reply) {

            await MessagingService.response(BeaconBuilder.serviceName, message.reply,
                new BeaconResponse(
                    200,
                    {
                        ad: message.data,
                        beacons: await getBeacons(message.data)
                    }));
            return Promise.resolve();

        }
        else {
            return Promise.reject(`Error sending request Message. Use "request" instead of "subscribe" for expecting a response of it. Message: ${JSON.stringify(message)}`);
        }

    }
}

async function getBeacons(url: string) : Promise<string[]> {
    let beaconNumber = 0;
    const beacons = [];
    const total = Math.floor(Math.random() * 5);

    for (let i = 0; i < total; i++) {
        beacons.push(`Beacon #${++beaconNumber} from ${BeaconBuilder.INSTANCE_ID} for the ad ${url}`);
    }

    return Promise.resolve(beacons);
}