import { Kafka } from "kafkajs";
import express from "express";

const kafka = new Kafka({
    clientId: "producer",
    brokers: ["kafka:9092"],
});

const producer = kafka.producer();

const app = express("express");
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", async(req, res) => {
    const value = req.body.value;

    if (isNaN(value)) {
        res.sendStatus(400);
    } else {
        try {
            // Conecta con el productor Kafka
            await producer.connect();
            await producer.send({
                topic: "calc-stats",
                messages: [{ value: value }],
            });

            res.sendStatus(200);
        } catch (error) {
            console.error('Error:', error);
            res.sendStatus(500);
        } finally {
            // Desconecta el productor Kafka después de enviar el mensaje
            await producer.disconnect();
        }
    }
});

app.listen(port, () => {
    console.log(`Producer app listening on port ${port}`);
});
