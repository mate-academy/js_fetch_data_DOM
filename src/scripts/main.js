'use strict';

const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/api/';

const list = document.createElement('ul');

document.body.append(list);

list.style.margin = '10px';

const resArray = [];

const request = (endUrl) => {
  return fetch(`${BASE_URL}${endUrl}`)
    .then(response => {
      if (!response.ok) {
        setTimeout(() => {
          return Promise.reject(new Error());
        }, 5000);
      }

      return response.json();
    });
};

const getPhones = () => {
  return request('phones.json');
};

const getPhonesDetails = (data) => {
  const phoneId = data.map(item => item.id);

  return Promise.all(phoneId.map(id => {
    const details = request(`phones/${id}.json`);

    details.then(res => resArray.push(res));
  }));
};

getPhones()
  .then(res => {
    res.map(phone => {
      const li = document.createElement('li');

      li.innerText = phone.name;
      list.append(li);
    });

    return res;
  })
  .then(phone => getPhonesDetails(phone));
