'use strict';

// write your code here

const LIST_URL
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
const DETAILS_URL
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';
const body = document.querySelector('body');
const list = document.createElement('ul');

body.append(list);

const getPhones = url => {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`Error from server`, response.status);
    }

    return response.json();
  });
};

function printErr(error) {
  setTimeout(() => {
    throw new Error(`Can't recieve data from server`, error);
  }, 1000);
}

function printList(value) {
  list.innerHTML = value
    .map(el => {
      return `<li>${el.name}</li>`;
    })
    .join('');
}
getPhones(LIST_URL).then(printList).catch(printErr);

const getPhonesDetails = (url, phoneId) => {
  return fetch(`${url}${phoneId}.json`).then(response => {
    if (!response.ok) {
      throw new Error(`Error from server`, response.status);
    }

    return response.json();
  });
};

const phonesWithDetails = [];

getPhones(LIST_URL).then(result => {
  result.map(e => {
    getPhonesDetails(DETAILS_URL, e.id).then(res => {
      phonesWithDetails.push([e, res]);
    });
  });
});
