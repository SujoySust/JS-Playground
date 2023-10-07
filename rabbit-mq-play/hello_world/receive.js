const amqp = require('amqplib');

async function connectConsumer() {
  const connectServer =
  "amqps://ghqwhblv:s1QHRN66p_eCt3zDHu8dO-wyOGTuPP7L@armadillo.rmq.cloudamqp.com/ghqwhblv";
  const connection = await amqp.connect(connectServer);
  const channel = await connection.createChannel();
  await channel.assertQueue("hello");
  channel.consume("hello", message => {
      const msg= JSON.parse(message.content.toString());
      console.log(msg);
  });
}

connectConsumer();