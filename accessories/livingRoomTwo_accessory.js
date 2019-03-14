const axios = require('axios');
var Accessory = require('../').Accessory;
var Service = require('../').Service;
var Characteristic = require('../').Characteristic;
var uuid = require('../').uuid;

const BLIND_ID = '6fdfd0a6-4251-4554-894c-403c26201876';
const BLIND_NAME = 'Living Room Two';
const MANUFACTURER_NAME = 'TigerHome';
const MODEL_NAME = 'A';
const SERIAL_NUMBER = 1

var blindUuid = BLIND_ID;
var blindAccessory = exports.accessory = new Accessory(BLIND_NAME, blindUuid);

const tigerHomeBlindsEndpoint = process.env.BASE_URL;

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
  .setCharacteristic(Characteristic.PositionState, Characteristic.PositionState.CLOSED)
  .getCharacteristic(Characteristic.TargetPosition)
  .on('set', (value, callback) => {

    console.log(`Setting Blind Position: ${ value }`);

    var url = '';

    if (value === 0) {
      url = `/${BLIND_ID}/closeBlind`;
    } else if (value === 100) {
      url = `/${BLIND_ID}/openBlind`;
    }

    console.log(tigerHomeBlindsEndpoint + url);
    if (url !== '') {
      axios.post(tigerHomeBlindsEndpoint + url)
      .then(() => {
        callback();
        blindAccessory
        .getService(Service.WindowCovering)
        .setCharacteristic(Characteristic.CurrentPosition, value);
      })
      .catch((err) => {
        console.log('error with post');
        callback(err);
      })
    }
});

blindAccessory
  .getService(Service.WindowCovering)
  .getCharacteristic(Characteristic.CurrentPosition)
  .on('get', (callback) => {
    var err = null;
    callback(err, Characteristic.PositionState.CLOSED);
  });
