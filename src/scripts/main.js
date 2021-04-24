'use strict';

const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/api';

const request = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return reject(new Error('Timeout error'));
    }, 5000);

    fetch(`${BASE_URL}${url}`)
      .then(response => response.json())
      .then(data => resolve(data));
  });
};

const getPhones = () => {
  return request('/phones.json');
};

async function getPhonesDetails(ids) {
  const result = [];

  for (const id of ids) {
    result.push(await request(`/phones/${id}.json`));
  }

  return result;
}

phonesWithDetails().then(showPhonesInfo);

async function phonesWithDetails() {
  try {
    const phones = await getPhones();
    const details = await getPhonesDetails(phones.map(phone => phone.id));

    return phones.map(phone => {
      const phoneWithDetails = Object.assign({}, phone);

      phoneWithDetails['details'] = details.find(data => data.id === phone.id);

      return phoneWithDetails;
    });
  } catch (error) {
    console.warn('Error: ', error);
  }
}

function showPhonesInfo(phones) {
  document.body.insertAdjacentHTML('beforeend', `
    <ul>
  ${phones.map(phone => {
    return `<li>
      <em>${phone.name}</em>
      <p>Description: ${phone.details.description}</p>
    </li>`;
  }).join('')}
    </ul>
  `);
}