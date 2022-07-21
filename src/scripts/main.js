'use strict';

const ul = document.createElement('ul');

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

function getPhonesDetails(array) {
  const phonesInfo = [];

  for (const i of array) {
    request(`https://mate-academy.github.io/`
    + `phone-catalogue-static/api/phones/${i.id}.json`)
      .then(response => {
        const li = document.createElement('li');

        li.innerText = response.name;
        ul.append(li);
        phonesInfo.push(i);
      })
      .catch((error) => {
        return new Error(error);
      });
  }

  document.body.append(ul);

  return phonesInfo;
}

getPhones('https://mate-academy.github.io/'
+ 'phone-catalogue-static/api/phones.json')
  .then(response => {
    getPhonesDetails(response);
  })
  .catch(error => {
    setTimeout(() => {
      document.body.append(error);
    }, 5000);
  });
