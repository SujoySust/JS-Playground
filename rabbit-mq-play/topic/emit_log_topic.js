const amqp = require("amqplib");
const exchange = 'topic_logs';
const args = process.argv.slice(2);
const msg = args.slice(1).join(' ') || 'Hello World'
const key = (args.length > 0) ? args[0] : 'anonymous.info';

async function connectEmmitLogTopic() {
  const connectServer =
  "amqps://ghqwhblv:s1QHRN66p_eCt3zDHu8dO-wyOGTuPP7L@armadillo.rmq.cloudamqp.com/ghqwhblv";

  if (args.length == 0) {
    console.log("Usage: receive_logs_topic.js <facility>.<severity>");
    process.exit(1);
  }
  

  const connection = await amqp.connect(connectServer);
  const channel = await connection.createChannel();
  await channel.assertExchange(exchange, 'topic', {
    durable: false,
  });
  await channel.publish(exchange, key, Buffer.from(msg));
  console.log(`[x] Sent ${key}  ${msg}`);
  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
}

connectEmmitLogTopic();