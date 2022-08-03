'use strict';

const listURL = 'https://mate-academy.github.io/'
+ 'phone-catalogue-static/api/phones.json';

function request(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok
      && !response.headers.get('content-type').includes('application/json')) {
        return Promise.reject(new Error(`${response.status}`));
      }

      return response.json();
    });
}

function getPhones(url) {
  return request(url);
}

function getPhonesDatails(array) {
  const phonesDatails = [];
  const ul = document.createElement('ul');

  for (const item of array) {
    request(`https://mate-academy.github.io/`
    + `phone-catalogue-static/api/phones/${item.id}.json`)
      .then(response => {
        const li = document.createElement('li');

        li.innerText = response.name;

        ul.append(li);
        phonesDatails.push(ul);
      })
      .catch((error) => {
        return new Error(error);
      });
  }

  document.body.append(ul);

  return phonesDatails;
}

getPhones(listURL)
  .then(response => {
    getPhonesDatails(response);
  })
  .catch(error => {
    setTimeout(() => {
      document.body.append(error);
    }, 5000);
  });
