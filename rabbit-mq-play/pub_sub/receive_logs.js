const amqp = require('amqplib');
const exchange = 'logs';
async function connectReciverLog() {
  const connectServer =
  "amqps://ghqwhblv:s1QHRN66p_eCt3zDHu8dO-wyOGTuPP7L@armadillo.rmq.cloudamqp.com/ghqwhblv";
  const connection = await amqp.connect(connectServer);
  const channel = await connection.createChannel();
  await channel.assertExchange(exchange, 'fanout', {
    durable: false,
  });

  const queue = await channel.assertQueue('',{
    exclusive: true,
  });

  await channel.bindQueue(queue.queue, exchange, '');

  await channel.consume(queue.queue, message => {
      const msg = message.content.toString();
      console.log(`[x] received ${msg}`)
  });
}
connectReciverLog();