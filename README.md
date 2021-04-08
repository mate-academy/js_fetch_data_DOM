1. Replace `<your_account>` with your Github username in the link
    - [DEMO LINK](https://yurasokal.github.io/js_fetch_data_DOM/)
2. Follow [this instructions](https://mate-academy.github.io/layout_task-guideline/)
    - Run `npm run test` command to test your code;
    - Run `npm run test:only -- -n` to run fast test ignoring linter;
    - Run `npm run test:only -- -l` to run fast test with additional info in console ignoring linter.

### Task: Fetch data

API Urls:
- List URL: https://mate-academy.github.io/phone-catalogue-static/api/phones.json
- Details URL: https://mate-academy.github.io/phone-catalogue-static/api/phones/:phoneId.json

The main goal of this task is practice of fetching data from API.
Your task is create function `getPhones` that should `resolve` with the list of phones or `reject` in `5` second.

After receiving list of phones get all IDs and fetch all details for these phone ids with function `getPhonesDetails`, which takes array of IDs.
`getPhonesDetails` should `resolve` with an array of details of each phone in the list or `reject` on any error.

Show phone names using the DOM.

(optional) Combine all data. Make array `phonesWithDetails`.





















'use strict';

const listUrl
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
const detailsUrl
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';

const parseResponse = response => {
  return response.json();
};

function timeout(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => (
      reject(new Error(`Timeouted after ${delay} milliseconds`))
    ), delay);
  });
}

function getPhonesFromApi() {
  return fetch(listUrl);
}

function getPhonesWithTimeout() {
  return Promise.race([
    getPhonesFromApi(),
    timeout(5000),
  ])
    .then(parseResponse)
    .catch(error => {
      // eslint-disable-next-line no-console
      console.warn(error.message);

      return [];
    });
}

function getPhones() {
  getPhonesWithTimeout()
    .then(phones => phones.map(phone => phone.name))
    .then(names => names.map(phoneName => {
      const li = document.createElement('li');

      li.textContent = phoneName;

      return li;
    }))
    .then(lis => {
      const ul = document.createElement('ul');

      ul.append(...lis);

      document.body.append(ul);
    });
}

function getDetails(ids) {
  const detailsPromises = ids.map(id => {
    return fetch(
      // eslint-disable-next-line max-len
      `https://mate-academy.github.io/phone-catalogue-static/api/phones/${id}.json`
    )
      .then(parseResponse);
  });

  return Promise.all(detailsPromises);
}

function getPhonesWithDetails() {
  getPhonesWithTimeout()
    .then(phones => phones.map(phone => phone.id))
    .then(getDetails)
    .then(console.log);
}

getPhonesWithDetails();









const listUrl
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
const detailsUrl
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';

const getPhones = (url) => {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(new Error(
          `${response.status} - ${response.statusText}`
        ));
      }
    });

  return new Promise(function(resolve, reject) {
    fetch(url)
      .then(response => response.json())
      .then(list => resolve(list.map(phone =>
        phone.id)));

    setTimeout(() => {
      reject(new Error('Error!'));
    }, 5000);
  });
};

const getPhonesDetails = (ids) => {
  const preparedList = ids.map(
    phoneId => fetch(`${detailsUrl}${phoneId}.json`)
      .then(response => response.json()
      )
  );

  return Promise.all(preparedList);
};

const displayList = (preparedList) => {
  const list = document.createElement('ul');

  preparedList.forEach(element => {
    const domElement = document.createElement('li');

    domElement.textContent = element.name;
    list.append(domElement);
  });

  document.body.append(list);
};

getPhones(listUrl)
  .then(getPhonesDetails)
  .then(displayList);
