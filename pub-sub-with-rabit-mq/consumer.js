const amqp = require("amqplib");

connect();

async function connect() {
    try {
        const ampqServer = "amqps://ghqwhblv:s1QHRN66p_eCt3zDHu8dO-wyOGTuPP7L@armadillo.rmq.cloudamqp.com/ghqwhblv";
        const connection = await amqp.connect(ampqServer);
        const channel = await connection.createChannel();
          await channel.assertQueue("jobs");

        channel.consume("jobs", message => {
            const input = JSON.parse(message.content.toString());
            console.log(`Received job with input ${input.number}`);
            if (input.number == 7) {
                channel.ack(message);
            }
        });

        console.log("Waiting for messages")

    } catch(err){
        console.log(err);
    }
}