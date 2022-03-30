'use strict';

// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/api';

const render = (root) => (element) => {
  root.append(element);
};

const renderInRoot = render(document.body);

const request = (url, duration = 0) => {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}${url}`).then((response) => {
      if (!response.ok) {
        reject(
          new Error(`${response.status} - ${response.statusText}`),
        );
      }

      if (!response.headers.get('content-type').includes('application/json')) {
        reject(new Error(`Current type is not supported`));
      }

      resolve(response.json());
    });

    (duration > 0 && setTimeout(() => {
      reject(new Error('Fetch is too long'));
    }, duration));
  });
};

const getPhones = () => request('/phones.json', 5000);
const getPhonesDetails = (id) => request(`/phones/${id}.json`);

const phonesDetails = [];

const generateList = (items) => {
  const list = document.createElement('ul');

  for (let i = 0; i < items.length; i++) {
    const listItem = document.createElement('li');

    listItem.textContent = items[i].name;
    list.append(listItem);
  }

  renderInRoot(list);

  items.map(({ id }) => getPhonesDetails(id)
    .then((data) => phonesDetails.push(data))
    .catch((error) => console.warn(`ERROR!!! \n\t ${error}`))
  );
};

getPhones()
  .then(generateList)
  .catch((error) => console.warn(`ERROR!!! \n\t ${error}`));

window.showDetails = () => console.log(phonesDetails);
