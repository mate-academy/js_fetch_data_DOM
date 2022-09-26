('use strict');

const controller = new AbortController();

setTimeout(() => {
  controller.abort();
  throw new Error('request timed out');
}, 5000);

const phonesDetails = [];

const Baseurl = 'https://mate-academy.github.io/phone-catalogue-static/api';

const request = (url) => {
  return fetch(`${Baseurl}${url}`, {
    signal: controller.signal,
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
};

function displayData(data) {
  for (const item of data) {
    const phonesUl = document.querySelector('#phones-list');
    const phonesLi = document.createElement('li');
    const p = document.createElement('p');

    phonesLi.className = 'phone-item';
    p.className = 'mb-0';

    p.innerHTML = item.name;

    phonesLi.append(p);
    phonesUl.append(phonesLi);
  }
}

const getPhones = () => {
  return request('/phones.json').then((data) => {
    displayData(data);
  });
};

const getPhonesDetails = (phoneIds) => {
  for (const phone of phoneIds) {
    request(`/phones/${phone}.json`)
      .then((data) => {
        phonesDetails.push(data);
      })
      .catch((error) => new Error(error));
  }
};

getPhones();
getPhonesDetails();
