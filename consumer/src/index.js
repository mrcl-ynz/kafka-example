import { Kafka } from "kafkajs";
import nodemailer from "nodemailer";

const kafka = new Kafka({
    clientId: "consumer",
    brokers: ["kafka:9092"],
});

const consumer = kafka.consumer({ groupId: "consumer-group" });

// Configuración para enviar correos electrónicos usando Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'superfelipe.ff@gmail.com', // Tu dirección de correo electrónico de origen
        pass: 'diml pmfc stci hexa', // Tu contraseña de correo electrónico de origen
    },
});

await consumer.connect();
await consumer.subscribe({ topic: "calc-stats", fromBeginning: true });

await consumer.run({
    eachMessage: async function({ message }) {
        const value = Number(message.value.toString());

        console.log(value);

        // Envía un correo electrónico con las estadísticas
        await transporter.sendMail({
            from: 'superfelipe.ff@gmail.com', // Tu dirección de correo electrónico de origen
            to: 'felipe.fernandez1@mail.udp.cl', // El de-stinatario del correo electrónico
            subject: 'Estadísticas de Kafka',
            text: `hola mundo`,
        });

    }
})
