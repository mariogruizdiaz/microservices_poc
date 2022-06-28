import express from "express";
import 'dotenv/config';
import { getAds } from "./fakes/AdRequesterService";
import { BeaconRequest, FwURlRequest, FwUrlResponse, MessagingService } from "mservices_toolkit";



const SERVICE_NAME = "Pause Ad";
MessagingService.init(process.env.NATS_SERVER_URL as string, SERVICE_NAME)
    .then(() => {
        const app = express();

        app.get("/image", async function (req, res) {

            // Getting the Fw URL
            const fwUrlResponse = await MessagingService.request(SERVICE_NAME, new FwURlRequest({ params: [1, 2, 3] })) as FwUrlResponse;

            // Getting Ads
            const ads = await getAds(fwUrlResponse.fwURl);


            // Getting beacons for each ad in the list
            const getBeaconPromises = ads.map(ad => MessagingService.request(SERVICE_NAME, new BeaconRequest(ad)));

            Promise.all(getBeaconPromises).then((results) => {
                res.send(results.map(ad => ({ extendedAd: ad.payload, statusCode: ad.statusCode})));
            });

        });


        const port = 3000;
        app.listen(port, () => {
            console.log(`Pause Ad µService is running like a champion! Listening in the port ${port}`);
        });

    });



