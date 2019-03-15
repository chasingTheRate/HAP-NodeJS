var Accessory = require('../').Accessory;
var Service = require('../').Service;
var Characteristic = require('../').Characteristic;
var uuid = require('../').uuid;
const blindsController = require('../controllers/blindsController');

const BLIND_ID = 'd09f7c3e-cb0e-471e-a276-9e2d3504bfec';
const BLIND_NAME = 'Living Room One';
const MANUFACTURER_NAME = 'TigerHome';
const MODEL_NAME = 'A';
const SERIAL_NUMBER = 1

//  ^^ UPDATE VALUES ^^
// **********************************************************************************************************

var blindUuid = BLIND_ID;
var blindAccessory = exports.accessory = new Accessory(BLIND_NAME, blindUuid);

async function openBlind(callback) {
  await blindsController.openBlind(BLIND_ID)
  callback()
  setCurrentPosition(100);
}

async function closeBlind(callback) {
  await blindsController.closeBlind(BLIND_ID)
  callback()
  setCurrentPosition(0);
}

async function getCurrentPosition() {
  const response = await blindsController.getCurrentPositionById(BLIND_ID)
  return response.data[0].currentPosition;
}

function setCurrentPosition(value) {
  blindAccessory
  .getService(Service.WindowCovering)
  .setCharacteristic(Characteristic.CurrentPosition, value);
}

async function getCurrentPosition(callback) {
  const response = await blindsController.getCurrentPositionById(BLIND_ID)
  callback(null, response.data[0].currentPosition);
}

function setTargetPosition(value, callback) {
  try {
    if (value === 0) {
      closeBlind(callback);
    } else if (value === 100) {
      openBlind(callback);
    } else {
      setCurrentPosition(value)
      callback();
    }
  } catch (err) {
    callback(err);
  }
}

blindAccessory
  .getService(Service.AccessoryInformation)
  .setCharacteristic(Characteristic.Manufacturer, MANUFACTURER_NAME)
  .setCharacteristic(Characteristic.Model, MODEL_NAME)
  .setCharacteristic(Characteristic.SerialNumber, SERIAL_NUMBER);

  blindAccessory.on('identify', function(paired, callback) {
  console.log(`${BLIND_NAME} Identified...`);
  callback();
});

blindAccessory
  .addService(Service.WindowCovering, BLIND_NAME)
  .setCharacteristic(Characteristic.PositionState, Characteristic.PositionState.STOPPED)
  
blindAccessory
  .getService(Service.WindowCovering)
  .getCharacteristic(Characteristic.TargetPosition)
  .on('set', setTargetPosition)
  .on('get', getCurrentPosition)

blindAccessory
  .getService(Service.WindowCovering)
  .getCharacteristic(Characteristic.CurrentPosition)
  .on('get', getCurrentPosition)