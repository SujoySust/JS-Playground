const amqp = require("amqplib");
async function connectPublisher() {
  const connectServer =
  "amqps://ghqwhblv:s1QHRN66p_eCt3zDHu8dO-wyOGTuPP7L@armadillo.rmq.cloudamqp.com/ghqwhblv";
  const connection = await amqp.connect(connectServer);
  const channel = await connection.createChannel();
  await channel.assertQueue("hello");
  const msg = "Hello ";
  await channel.sendToQueue("hello", Buffer.from(JSON.stringify(msg)));

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
}

connectPublisher();


