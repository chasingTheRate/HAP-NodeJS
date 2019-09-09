var Accessory = require('../').Accessory;
var Service = require('../').Service;
var Characteristic = require('../').Characteristic;
var uuid = require('../').uuid;

const { CONTACT_SENSOR_DID_CHANGE_STATUS } = require('../messages/messageEventTypes');
const ContactSensorController = require('../controllers/contactSensorController');

const contactSensorController = new ContactSensorController(1234);

contactSensorController.on(CONTACT_SENSOR_DID_CHANGE_STATUS, (err, state) => {
    if (!err) {
      contactSensor
        .getService(Service.ContactSensor)
        .getCharacteristic(Characteristic.ContactSensorState)
        .setValue(state);
    }
})

var contactSensorUUID = uuid.generate('hap-nodejs:accessories:contact-sensor');
var contactSensor = exports.accessory = new Accessory('Tiger Contact Sensor', contactSensorUUID);

// Add properties for publishing (in case we're using Core.js and not BridgedCore.js)
contactSensor.username = "C1:5D:3G:EE:5E:FB"; //edit this if you use Core.js
contactSensor.pincode = "031-45-154";

contactSensor
  .getService(Service.AccessoryInformation)
  .setCharacteristic(Characteristic.Manufacturer, "Eaton Corp")
  .setCharacteristic(Characteristic.Model, "Rev-A")
  .setCharacteristic(Characteristic.SerialNumber, "1");

contactSensor.on('identify', (paired, callback) => {
  console.log('Contact Sensor Identified');
  callback();
});

contactSensor
  .addService(Service.ContactSensor, "TigerContactSensor")
  .setCharacteristic(Characteristic.ContactSensorState, 0)