
const CreateBlindAccessory = require('../templates/CreateBlindAccessory').CreateBlindAccessory;

const deviceOptions = {
  blindId: 'd09f7c3e-cb0e-471e-a276-9e2d3504bfec',
  name: 'Living Room One',
  manufacturerName: 'TigerHome',
  modelName: 'A',
  serialNumber: 1,
}

exports.accessory = CreateBlindAccessory(deviceOptions);