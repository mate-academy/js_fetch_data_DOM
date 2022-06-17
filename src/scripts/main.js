'use strict';

const urlList
 = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';

const ul = document.createElement('ul');

document.body.append(ul);

const request = (url) => {
  return fetch(url)
    .then(response => {
      return response.ok
        ? response.json()
        : setTimeout(() => {
          throw new Error('Something wrong');
        }, 5000);
    });
};

const getPhones = () => request(`${urlList}.json`)
  .then(result => {
    const idxs = result.map(phone => phone.id);

    getPhonesDetails(idxs);
  });

const getPhonesDetails = (arrayIds) => {
  arrayIds.forEach(id => request(`${urlList}/${id}.json`)
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
