const CreateBlindAccessory = require('../templates/CreateBlindAccessory').CreateBlindAccessory;

const deviceOptions = {
  blindId: 'f7bb67cd-ef62-4d08-94b9-43470bb955b1',
  name: 'Living Room Three',
  manufacturerName: 'TigerHome',
  modelName: 'A',
  serialNumber: 1,
}

exports.accessory = CreateBlindAccessory(deviceOptions);