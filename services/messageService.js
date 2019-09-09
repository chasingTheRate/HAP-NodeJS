const amqp = require('amqplib/callback_api');
const EventEmitter = require('events');
const { CONTACT_SENSOR_DID_CHANGE_STATUS } = require('../messages/messageEventTypes');
const { TIGER_EXCHANGE } = require('../messages/exchanges');

const messageEvents = new EventEmitter();

amqp.connect('amqp://localhost', (err, conn) => {
  
  if (err) {
    throw err;
  }

  conn.createChannel((err1, chan) => {

    if (err1) {
      throw err1;
    }

    chan.assertExchange(TIGER_EXCHANGE, 'fanout', {
      durable: false
    });

    chan.assertQueue('', {
      exclusive: true
    }, (err2, queue) => {
      
      if (err2) {
        throw err2;
      }
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue.queue);
      chan.bindQueue(queue.queue, TIGER_EXCHANGE, '');

      chan.consume(queue.queue, (msg) => {
        if (msg.content) {
            messageEvents.emit(CONTACT_SENSOR_DID_CHANGE_STATUS, null, msg.content.toString());
          }
      }, {
        noAck: true
      });
    });
  });
});

module.exports = messageEvents;