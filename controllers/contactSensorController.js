const EventEmitter = require('events');
const MessageService = require('../services/messageService');
const { 
  RECIEVED_CONTACT_SENSOR_STATUS,
  CONTACT_SENSOR_DID_CHANGE_STATUS 
} = require('../messages/messageEventTypes');

class ContactSensorController extends EventEmitter {
  constructor(id){
    super();
    this.id = id;
    this.state = this.getState();

    this.handleMessage = this.handleMessage.bind(this);

    MessageService.on(CONTACT_SENSOR_DID_CHANGE_STATUS, this.handleMessage)
  }

  getState() {
    return 0
  }

  didChangeStatus(status) {
    this.state = status.state;
    this.emit(CONTACT_SENSOR_DID_CHANGE_STATUS, null, status.state);
  }

  handleMessage(err, msg) {
    if (!err) {
      const status = JSON.parse(msg);
      this.didChangeStatus(status);
    }
  }
}

module.exports = ContactSensorController;
