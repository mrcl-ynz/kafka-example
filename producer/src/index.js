import { Kafka } from "kafkajs";
import express from "express";

const kafka = new Kafka({
    clientId: "producer",
    brokers: ["kafka:9092"],
});

const producer = kafka.producer();

const app = express("express");
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post("/", async(req, res) => {
    const value = req.body.value;

    if (isNaN(value)) {
        res.sendStatus(400);
    } else {
        await producer.connect();
        await producer.send({
            topic: "calc-stats",
            messages: [ { value: value } ],
        });
        await producer.disconnect();

        res.sendStatus(200);
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
