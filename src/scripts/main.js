'use strict';

const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/api';

const request = url => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        return (new Error(`${response.status} - ${response.statusText}`));
      }

      return response.json();
    });
};

const getPhones = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject, 5000);

    return resolve(request('/phones.json'));
  });
};

const getPhonesDetails = (ids) => {
  return Promise.all(
    ids.map(id => request(`/phones/${id}.json`))
  );
};

const ul = document.createElement('ul');

document.body.append(ul);

getPhones()
  .then(data => {
    for (const phone of data) {
      const li = document.createElement('li');

      li.innerText = phone.name;
      ul.append(li);
    }

    return data;
  })
  .then(data => getPhonesDetails(data.map(phone => phone.id)));
