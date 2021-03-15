'use strict';

const body = document.querySelector('body');
const baseUrl
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones';

const getPhones = () => {
  const rules = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Promise was rejected')), 5000);
    resolve();
  });

  return rules.then(() => fetch(`${baseUrl}.json`)
    .then(result => result.json()), (err) => err);
};

const getPhonesDetails = (IDs) => {
  for (const id of IDs) {
    fetch(`${baseUrl}/${id}.json`)
      .then(result => result.json())
      .then(result => body.insertAdjacentHTML('afterbegin', `<span>
        ${result.name}
      </span>`));
  }
};

getPhones().then(result => {
  const ids = [...result].map(data => data.id);

  getPhonesDetails(ids);
});
