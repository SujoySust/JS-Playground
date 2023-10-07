const amqp = require('amqplib');
const queue = 'task_queue';
async function connectWorker() {
  const connectServer =
  "amqps://ghqwhblv:s1QHRN66p_eCt3zDHu8dO-wyOGTuPP7L@armadillo.rmq.cloudamqp.com/ghqwhblv";
  const connection = await amqp.connect(connectServer);
  const channel = await connection.createChannel();
  await channel.assertQueue(queue);
  channel.consume(queue, message => {
      const msg = message.content.toString();
      const secs = msg.split('.').length - 1;
      console.log(`[x] received ${msg}`)
      setTimeout(()=> {
        console.log("[x] Done");
      }, secs * 1000)
  });
}

connectWorker();