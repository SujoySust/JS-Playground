const amqp = require("amqplib");
const exchange = 'logs';
const msg = process.argv.slice(2).join(' ') || 'Hello World'
async function connectEmmitLogs() {
  const connectServer =
  "amqps://ghqwhblv:s1QHRN66p_eCt3zDHu8dO-wyOGTuPP7L@armadillo.rmq.cloudamqp.com/ghqwhblv";
  const connection = await amqp.connect(connectServer);
  const channel = await connection.createChannel();
  await channel.assertExchange(exchange, 'fanout', {
    durable: false,
  });
  await channel.publish(exchange, '', Buffer.from(msg));
  console.log(`[x] Sent  ${msg}`);
  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
}

connectEmmitLogs();