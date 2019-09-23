var Accessory = require('..').Accessory;
var Service = require('..').Service;
var Characteristic = require('..').Characteristic;
const blindsController = require('../controllers/blindsController');

function CreateBlindAccessory(options) {

  const 
  { 
    blindId, 
    name, 
    manufacturerName,
    modelName,
    serialNumber
  } = options;
  
  const accessory = new Accessory(name, blindId);

  async function openBlind(callback) {
    try {
      await blindsController.openBlind(blindId)
      callback()
      setCurrentPosition(100);
    } catch (err) {
      console.error(`openBlind Error`);
      callback(err)
    }
  }
  
  async function closeBlind(callback) {
    try {
      await blindsController.closeBlind(blindId)
      callback()
      setCurrentPosition(0);
    } catch (err) {
      console.error(`closeBlind Error`);
      callback(err)
    }
  }
  
  async function getCurrentPosition(callback) {
    try { 
      const response = await blindsController.getCurrentPositionById(blindId)
      callback(null, response.data[0].currentPosition);
    } catch (err) {
      console.log(`getCurrentPosition Error`);
      callback(err);
    }
  }
  
  function setCurrentPosition(value) {
    accessory
      .getService(Service.WindowCovering)
      .setCharacteristic(Characteristic.CurrentPosition, value);
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
      console.log(`setTargetPosition: ${err}`);
      callback(err);
    }
  }

  accessory
    .getService(Service.AccessoryInformation)
    .setCharacteristic(Characteristic.Manufacturer, manufacturerName)
    .setCharacteristic(Characteristic.Model, modelName)
    .setCharacteristic(Characteristic.SerialNumber, serialNumber);

  accessory.on('identify', function(paired, callback) {
    console.log(`${blindId} Identified...`);
    callback();
  });

  accessory
    .addService(Service.WindowCovering, name)
    .setCharacteristic(Characteristic.PositionState, Characteristic.PositionState.STOPPED)

  accessory
    .getService(Service.WindowCovering)
    .getCharacteristic(Characteristic.TargetPosition)
    .on('set', setTargetPosition)
    .on('get', getCurrentPosition)
   
  accessory
    .getService(Service.WindowCovering)
    .getCharacteristic(Characteristic.CurrentPosition)
    .on('get', getCurrentPosition)

  return accessory;

}

module.exports = {
  CreateBlindAccessory
}

