const amqp = require("amqplib");
const queue = 'task_queue';
const msg = process.argv.slice(2).join(' ') || 'Hello World'
async function connectNewTask() {
  const connectServer =
  "amqps://ghqwhblv:s1QHRN66p_eCt3zDHu8dO-wyOGTuPP7L@armadillo.rmq.cloudamqp.com/ghqwhblv";
  const connection = await amqp.connect(connectServer);
  const channel = await connection.createChannel();
  await channel.assertQueue(queue);
  await channel.sendToQueue(queue, Buffer.from(msg));
  console.log(`[x] Sent  ${msg}`);
  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
}

connectNewTask();