import 'dotenv/config';
import express from 'express';
import { init, request } from 'service-common';
import {
    RequestSubject as AdRequesterSubject,
    Request as AdRequesterRequest,
    Response as AdRequesterResponse
} from 'service_adrequester';
import {
    RequestSubject as FwUrlSubject,
    Request as FwUrlRequest,
    Response as FwUrlResponse
} from 'service_fwurlbuilder';
import {
    RequestSubject as BeaconBuilderSubject,
    Request as BeaconBuilderRequest,
    Response as BeaconBuilderResponse
} from 'service_beaconbuilder';

const SERVICE_NAME = 'Pause Ad';

(async () => {
    await init(process.env.NATS_SERVER_URL as string, SERVICE_NAME);

    const app = express();

    app.get('/image', async (req, res) => {
        // Getting the Fw URL
        const fwUrlResponse = await request<FwUrlResponse, FwUrlRequest>(
            FwUrlSubject.ComposeFreewheelURL,
            { params: [1, 2, 3] }
        );

        // Getting Ads
        const adRequesterResponse = await request<
            AdRequesterResponse,
            AdRequesterRequest
        >(AdRequesterSubject.GetAds, fwUrlResponse.fwURl);

        // Getting beacons for each ad in the list
        const beacons = await Promise.all(
            adRequesterResponse.ads.map((ad) =>
                request<BeaconBuilderResponse, BeaconBuilderRequest>(
                    BeaconBuilderSubject.ComposeBeacon,
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
})();
