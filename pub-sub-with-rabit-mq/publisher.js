// RabbitMQ

const amqp = require("amqplib");

const msg = {number: process.argv[2]};

connect();

async function connect() {
    try {
        const amqpServer = 'amqps://ghqwhblv:s1QHRN66p_eCt3zDHu8dO-wyOGTuPP7L@armadillo.rmq.cloudamqp.com/ghqwhblv';
        const connection = await amqp.connect(amqpServer);
        const channel = await connection.createChannel();
        await channel.assertQueue("jobs");
        await channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));
        console.log(`Job sent successfully ${msg.number}`);
        await channel.close();
        await connection.close();
    } catch (error) {
        console.log(error);
    }
}