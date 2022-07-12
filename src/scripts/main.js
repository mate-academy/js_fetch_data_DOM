'use strict';

const { ENDPOINTS, request } = require('./requests');
const body = document.querySelector('body');
const list = document.createElement('ul');

const getPhoneDetails = (idArr) => {
  return Promise.all(idArr.map(id => request(ENDPOINTS.phoneById(id))));
};

const getPhones = () => {
  request(ENDPOINTS.phones)
    .then((data) => {
      data.forEach(phone => {
        list.insertAdjacentHTML('beforeend', `<li>${phone.name}</li>`);
      });

      const ids = data.map(phone => phone.id);

      getPhoneDetails(ids)
        .then(response => {
          const phonesWithDetails = data.map((phone, i) => {
            return Object.assign(phone, response[i]);
          });

          // eslint-disable-next-line
        console.log(phonesWithDetails);
        });

      body.append(list);
    });
};

getPhones();
