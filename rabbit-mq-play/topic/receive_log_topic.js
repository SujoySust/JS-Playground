const amqp = require('amqplib');
const exchange = 'topic_logs';
var args = process.argv.slice(2);

async function connectReciverLogTopic() {
  if (args.length == 0) {
    console.log("Usage: receive_logs_topic.js <facility>.<severity>");
    process.exit(1);
  }
  const connectServer =
  "amqps://ghqwhblv:s1QHRN66p_eCt3zDHu8dO-wyOGTuPP7L@armadillo.rmq.cloudamqp.com/ghqwhblv";
  const connection = await amqp.connect(connectServer);
  const channel = await connection.createChannel();
  await channel.assertExchange(exchange, 'topic', {
    durable: false,
  });

  const queue = await channel.assertQueue('',{
    exclusive: true,
  });

  args.forEach(key => {
    channel.bindQueue(queue.queue, exchange, key)
  });

  await channel.consume(queue.queue, message => {
      console.log(`[x] received ${message.fields.routingKey} ${message.content.toString()}`)
  });
}
connectReciverLogTopic();