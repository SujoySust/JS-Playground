const amqp = require("amqplib");
const queue = "rpc_queue";
async function connectRpcServer() {
  const connectServer =
    "amqps://ghqwhblv:s1QHRN66p_eCt3zDHu8dO-wyOGTuPP7L@armadillo.rmq.cloudamqp.com/ghqwhblv";
  const connection = await amqp.connect(connectServer);
  const channel = await connection.createChannel();
  await channel.assertQueue(queue);
  await channel.prefetch(1);
  console.log(" [x] Awaiting RPC requests");

  channel.consume(queue, (msg) => {
    const n = parseInt(msg.content.toString());
    console.log(`fib(${n})`);
    const r = fibonacci(n);

    channel.sendToQueue(msg.properties.replyTo, Buffer.from(r.toString()), {
      correlationId: msg.properties.correlationId,
    });

    channel.ack(msg);
  });
}

function fibonacci(n) {
  if (n == 0 || n == 1) return n;
  else return fibonacci(n - 1) + fibonacci(n - 2);
}

connectRpcServer();
