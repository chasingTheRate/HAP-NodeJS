const axios = require('axios');

const baseUrl = process.env.BASE_URL;

const openBlind = (id) => {
  console.log(`Opening Blind. id: ${ id }`);
  const url = `${baseUrl}/${id}/openBlind`;
  return axios.post(url)
    .catch(error => {
      console.error(error);
    })
}

const closeBlind = (id) => {
  console.log(`Closing Blind. id: ${ id }`);
  const url = `${baseUrl}/${id}/closeBlind`;
  return axios.post(url)
    .catch(error => {
      console.error(error);
    })
}

const getCurrentPositionById = (id) => {
  return axios.get(`${baseUrl}/currentPosition?id=${id}`)
    .catch(error => {
      console.error(error);
    });
}

module.exports = {
    openBlind,
    closeBlind,
    getCurrentPositionById
}