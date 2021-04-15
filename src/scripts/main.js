'use strict';

const baseURL
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
const detailsURL
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';

const request = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          return Promise.reject(
            new Error(`${response.status} - ${response.statusText}`)
          );
        }

        if (!response.headers.get('content-type')
          .includes('application/json')) {
          return Promise.reject(
            new Error(`Content type is not supported`)
          );
        }

        return response.json();
      })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        // eslint-disable-next-line
        console.warn('Error:', error);
      });

    setTimeout(() => reject(new Error('Timeout error')), 5000);
  });
};

function getPhones() {
  return request(baseURL);
}

function getPhonesDetails(phoneId) {
  return request(`${detailsURL}/${phoneId}.json`);
}

function getDetails(phones) {
  Promise.all(phones.map(phone => getPhonesDetails(phone.id)))
    .then((details) => {
      const phonesWithDetails = combine(phones, details);

      displayData(phonesWithDetails);
    })
    .catch((error) => {
      // eslint-disable-next-line
      console.warn('Error:', error);
    });
};

function combine(phones, details) {
  return phones.map(phone => {
    const phoneDetails = details.find(detail => detail.id === phone.id);

    return {
      ...phone,
      ...phoneDetails,
    };
  });
};

function displayData(data) {
  const container = document.createElement('div');

  container.className = 'container';
  document.body.appendChild(container);

  data.map(phone => {
    const card = document.createElement('div');

    card.className = 'container__item';
    card.innerHTML = phone.id;
    container.appendChild(card);

    const details = document.createElement('div');

    details.className = 'container__details';
    details.innerHTML = createDetailsText(phone);
    container.appendChild(details);
  });
};

function createDetailsText(phone) {
  return Object.entries(phone).reduce((detailsText, [key, value]) => {
    let newText = detailsText;

    if (typeof value !== 'object') {
      newText += `${key}: ${value}<br/>`;
    }

    return newText;
  }, '');
};

getPhones(baseURL)
  .then((result) => {
    getDetails(result);
  })
  .catch((error) => {
    // eslint-disable-next-line
    console.warn('Error while fetching data', error);
  });
