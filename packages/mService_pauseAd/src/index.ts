import express from 'express';
import { JSONValue, MessagingService } from 'enterprise_service_bus';
import AdRequester, {
    Request as AdRequesterRequest,
    Response as AdRequesterResponse
} from 'service_adrequester';
import FwUrl, {
    Request as FwUrlRequest,
    Response as FwUrlResponse
} from 'service_fwurlbuilder';
import BeaconBuilder, {
    Request as BeaconBuilderRequest,
    Response as BeaconBuilderResponse
} from 'service_beaconbuilder';

const SERVICE_NAME = 'Pause Ad';

async function request<Req extends JSONValue, Res extends JSONValue>(
    subject: string,
    req: Req
): Promise<Res> {
    return (await MessagingService.request(subject, req)) as Res;
}

async function init(): Promise<void> {
    await MessagingService.init(
        process.env.NATS_SERVER_URL as string,
        SERVICE_NAME
    );

    const app = express();

    app.get('/image', async function (req, res) {
        // Getting the Fw URL
        const fwUrlResponse = await request<FwUrlRequest, FwUrlResponse>(
            FwUrl.RequestSubject.ComposeFreewheelURL,
            { params: [1, 2, 3] }
        );

        // Getting Ads
        const adRequesterResponse = await request<
            AdRequesterRequest,
            AdRequesterResponse
        >(AdRequester.RequestSubject.GetAds, fwUrlResponse.fwURl);

        // Getting beacons for each ad in the list
        const beacons = await Promise.all(
            adRequesterResponse.ads.map((ad) =>
                request<BeaconBuilderRequest, BeaconBuilderResponse>(
                    BeaconBuilder.RequestSubject.ComposeBeacon,
                    ad
                )
            )
        );

        res.send(beacons);
    });

    const port = 3000;
    app.listen(port, () => {
        console.log(
            `${SERVICE_NAME} µService is running like a champion! Listening in the port ${port}`
        );
    });
}

Promise.resolve(init());
