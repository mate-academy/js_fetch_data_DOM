'use strict';

const { endPoints, request } = require('api');
const list = document.createElement('ul');

function getPhonesDetails(ids) {
  return Promise.all(ids.map(id => request(endPoints.phoneByID(id))));
}

function getPhones() {
  request(endPoints.phones)
    .then(data => {
      data.forEach((item) => {
        const li = `<li>${item.name}</li>`;

        list.insertAdjacentHTML('beforeend', li);
      });

      const ids = data.map(item => item.id);

      getPhonesDetails(ids);

      // eslint-disable-next-line no-console
      console.log(getPhonesDetails(ids));
    });

  document.body.append(list);
}

getPhones();
