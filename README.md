# µServices Proof of Concept

This is a small RESTful api to demonstrate the power of dividing what could be a monolithic endpoint into one that ends up being an orchestrator of intermediate steps, resolved by other µServices, to finally return the expected response, a list of Ads
## Tech Specs
 - Monorepo with Lerna
 - Yarn
 - Node version >= 16
 - TypeScrip
 - NATS.io

## Design Pattern
 - Enterprise Service Bus (ESB)
    - Pub/SB Pattern
    - Req/Reply Pattern


## Rerequisites
<details>
  <summary>NATS.io running on localmanchine or in some remote server</summary>

For this poc NATS.io is the chosen messaging technology, but it can be switched to any other, such as KAFKA, Redis, RABITMQ, etc
The easy way to have it running in localhost is by usung its docker image

```
docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats
```

</details>


### PoC Setup

Execute the following commands to install the dependencies and run the services

```
yarn
npm run build
npm run start
```

If everything worked you will be able to send http get request to http://localhost:3000/image


### Documentation

https://lucid.app/lucidchart/c4c9770c-6b15-4057-ac4f-7ac91c2d2f3f/edit?view_items=whtRm.pRmuH4&invitationId=inv_4903b66c-f837-40e0-ae8b-d50c3ab16d85#

