import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "consumer",
    brokers: ["kafka:9092"],
});

const consumer = kafka.consumer({ groupId: "consumer-group" });

await consumer.connect();
await consumer.subscribe({ topic: "calc-stats", fromBeginning: true });

let values = [];

await consumer.run({
    eachMessage: async function({ message }) {
        const value = Number(message.value.toString());

        values.push(value);

        if (values.length < 100) return;

        console.log({
            min: Math.min(...values),
            max: Math.max(...values),
            avg: values.reduce((a, b) => a + b, 0) / values.length,
        });

        values = [];
    }
})
