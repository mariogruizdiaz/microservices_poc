import express from "express";
import 'dotenv/config';
import { AdRequesterRequest, AdRequesterResponse, FwURlRequest } from "../../data_model/build";
import { FwUrlResponse } from "../../data_model/build";
import { MessagingService } from "enterprise_service_bus";
import { BeaconRequest } from "../../data_model/build";



const SERVICE_NAME = "Pause Ad";
MessagingService.init(process.env.NATS_SERVER_URL as string, SERVICE_NAME)
    .then(() => {
        const app = express();

        app.get("/image", async function (req, res) {

            // Getting the Fw URL
            const fwUrlResponse = await MessagingService.request(SERVICE_NAME, new FwURlRequest({ params: [1, 2, 3] })) as FwUrlResponse;

            // Getting Ads
             const adRequesterResponse = await MessagingService.request(SERVICE_NAME, new AdRequesterRequest( fwUrlResponse.fwURl)) as AdRequesterResponse;
            

            // Getting beacons for each ad in the list
            const getBeaconPromises = adRequesterResponse.ads.map(ad => MessagingService.request(SERVICE_NAME, new BeaconRequest(ad)));

            Promise.all(getBeaconPromises).then((results) => {
                res.send(results.map(ad => ({ extendedAd: ad.payload, statusCode: ad.statusCode})));
            });

        });


        const port = 3000;
        app.listen(port, () => {
            console.log(`${SERVICE_NAME} µService is running like a champion! Listening in the port ${port}`);
        });

    });



