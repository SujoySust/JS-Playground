const amqp = require("amqplib");
const queue = "rpc_queue";

var args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Usage: rpc_client.js num");
  process.exit(1);
}

async function connectRpcClient() {
  const connectServer =
    "amqps://ghqwhblv:s1QHRN66p_eCt3zDHu8dO-wyOGTuPP7L@armadillo.rmq.cloudamqp.com/ghqwhblv";
  const connection = await amqp.connect(connectServer);
  const channel = await connection.createChannel();
  const queue = await channel.assertQueue("", {
    exclusive: true,
  });

  const correlationId = generateUuid();
  const num = parseInt(args[0]);

  console.log(" [x] Requesting fib(%d)", num);

  channel.consume(
    queue.queue,
    (msg) => {
      if (msg.properties.correlationId == correlationId) {
        console.log(" [.] Got %s", msg.content.toString());
        setTimeout(function () {
          connection.close();
          process.exit(0);
        }, 500);
      }
    },
    {
      noAck: true,
    }
  );

  channel.sendToQueue('rpc_queue',
  Buffer.from(num.toString()),{
    correlationId: correlationId,
    replyTo: q.queue });

}

connectRpcClient();

function generateUuid() {
  return (
    Math.random().toString() +
    Math.random().toString() +
    Math.random().toString()
  );
}
