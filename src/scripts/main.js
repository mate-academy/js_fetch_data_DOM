'use strict';

const BASE_URL = 'https://mate-academy.github.io/'
  + 'phone-catalogue-static/api/phones';

const request = (url) => {
  return fetch(`${BASE_URL}${url}`)
    .then((response) => {
      if (!response.ok) {
        setTimeout(() => {
          return Promise.reject(
            new Error(`${response.status} - the endpoint does not exist`)
          );
        }, 5000);
      }

      return response.json();
    });
};
const getPhones = () => {
  return request('.json')
    .catch((error) => setTimeout(() => alert(error), 5000));
};

const getPhonesDetails = (ids) => {
  const phonesDetails = [];

  ids.map(element => {
    request(`/${element}.json`)
      .then((detail) => {
        phonesDetails.push({ ...detail });
      })
      .catch((error) => {
        alert(error);
      });
  });

  return phonesDetails;
};
const phones = getPhones();
const list = document.createElement('ul');
const goodsId = [];
const phonesWithDetails = [];

phones
  .then((goods) => {
    goods.map(phone => {
      const li = document.createElement('li');

      phonesWithDetails.push({ ...phone });
      goodsId.push(phone.id);
      li.innerHTML = `${phone.name}`;

      list.appendChild(li);
      document.body.appendChild(list);
    });

    getPhonesDetails(goodsId);
  })
  .catch((error) => setTimeout(Promise.reject(new Error(error)), 5000));
