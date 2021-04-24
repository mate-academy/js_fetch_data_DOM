'use strict';

const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/api';

const request = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return reject(new Error('Timeout error'));
    }, 5000);

    fetch(`${BASE_URL}${url}`)
      .then(response => {
        if (!response.ok) {
          reject(new Error("Response isn't OK"));
        }

        return response.json();
      })
      .then(data => resolve(data));
  });
};

const getPhones = () => {
  return request('/phones.json');
};

const getPhonesDetails = (ids) => {
  return Promise.all(
    ids.map(id => request(`/phones/${id}.json`))
  );
};

getPhones()
  .then(phones => getPhonesDetails(phones.map(phone => phone.id)))
  .then(showPhoneNames)
  .catch(error => alert(`Error: ${error}`));

function showPhoneNames(phones) {
  document.body.insertAdjacentHTML('beforeend', `
    <ul>
      ${phones.map(phone => `<li>${phone.name}</li>`).join('')}
    </ul>
  `);
}
