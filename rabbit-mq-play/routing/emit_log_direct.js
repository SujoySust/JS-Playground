const amqp = require("amqplib");
const exchange = 'direct_logs';
const args = process.argv.slice(2);
const msg = args.slice(1).join(' ') || 'Hello World'
const severity = args.length > 0 ? args[0] : 'info';

async function connectEmmitLogDirect() {
  const connectServer =
  "amqps://ghqwhblv:s1QHRN66p_eCt3zDHu8dO-wyOGTuPP7L@armadillo.rmq.cloudamqp.com/ghqwhblv";

  const connection = await amqp.connect(connectServer);
  const channel = await connection.createChannel();
  await channel.assertExchange(exchange, 'direct', {
    durable: false,
  });
  await channel.publish(exchange, severity, Buffer.from(msg));
  console.log(`[x] Sent  ${msg}`);
  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
}

connectEmmitLogDirect();