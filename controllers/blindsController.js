const axios = require('axios');

const baseUrl = process.env.BASE_URL;

const openBlind = (id) => {
  console.log(`Opening Blind. id: ${ id }`);
  const url = `${baseUrl}/${id}/openBlind`;
  return axios.post(url)
}

const closeBlind = (id) => {
  console.log(`Closing Blind. id: ${ id }`);
  const url = `${baseUrl}/${id}/closeBlind`;
  return axios.post(url)
}

const getBlindStatusById = (id) => {
  return axios.get(`${baseUrl}/status?id=${id}`);
}

module.exports = {
    openBlind,
    closeBlind,
    getBlindStatusById
}