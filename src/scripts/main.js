'use strict';

const BASE_URL = `https://mate-academy.github.io`
  + `/phone-catalogue-static/api`;

const request = (url) => {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}${url}`)
      .then(response => response.json())
      .then(data => resolve(data));

    setTimeout(function() {
      reject(new Error('something went wrong'));
    }, 5000);
  });
};

const getPhones = () => request('/phones.json');

function getPhonesDetails(data) {
  const devicesIds = data.map(device => device.id);

  const promisedAll = devicesIds.map(
    id => request(`/phones/${id}.json`)
  );

  return Promise.all(promisedAll);
}

function createPhonesList(data) {
  const body = document.querySelector('body');
  const devicesList = document.createElement('ul');
  const devicesModels = data.map(device => device.name);

  devicesModels.forEach(element => {
    const device = document.createElement('li');

    device.innerText = element;
    devicesList.append(device);
  });
  body.append(devicesList);

  return data;
}

getPhones('/phones.json')
  .then(createPhonesList)
  .then(getPhonesDetails)
  .catch(error => alert(error));
