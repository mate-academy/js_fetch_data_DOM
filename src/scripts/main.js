'use strict';

const baseUrl
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones';
const ul = document.createElement('ul');

document.body.append(ul);

const request = (url) => {
  return fetch(url)
    .then(response => {
      return response.ok
        ? response.json()
        : setTimeout(() => {
          throw new Error('Can\'t load');
        }, 5000);
    });
};

const getPhones = () => request(`${baseUrl}.json`)
  .then(result => {
    const ids = result.map(phone => phone.id);

    getPhonesDetails(ids);
  });

const getPhonesDetails = (arrayIds) => {
  arrayIds.forEach(id => request(`${baseUrl}/${id}.json`)
    .then(data => ul.insertAdjacentHTML('beforeend', `
      <li>Name: ${data.name}
        <ul>
          <li>${data.display.screenResolution}</li>
          <li>${data.android.os}</li>
          <li>${data.storage.ram}</li>
        </ul>
      </li>
    `))
  );
};

getPhones();
