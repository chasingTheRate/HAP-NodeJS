const CreateBlindAccessory = require('../templates/CreateBlindAccessory').CreateBlindAccessory;

const deviceOptions = {
  blindId: '6fdfd0a6-4251-4554-894c-403c26201876',
  name: 'Living Room Two',
  manufacturerName: 'TigerHome',
  modelName: 'A',
  serialNumber: 1,
}

exports.accessory = CreateBlindAccessory(deviceOptions);