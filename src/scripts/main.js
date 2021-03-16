'use strict';
const ListURL ='https://mate-academy.github.io/phone-catalogue-static/api/phones.json';// eslint-disable-line
const DetailsURL = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';// eslint-disable-line

const getPhones = (url) => {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        setTimeout(() => {
          errorNotification();
        }, 5000);
      }

      return response.json();
    });
};

function errorNotification() {
  const notification = document.createElement('div');

  notification.className = 'error-notification';
  notification.innerText = 'ERROR';
  document.body.append(notification);
  console.warn('Error');// eslint-disable-line
};

function appendList(listOfPhones) {
  const list = document.createElement('ul');

  listOfPhones.forEach(phone => {
    const li = document.createElement('li');

    li.innerText = phone.name;
    list.append(li);
  });

  document.body.append(list);

  return listOfPhones;
}

function getPhoneDetails(listOfPhones) {
  const newList = listOfPhones.map(phone => phone.id).map(id => {
    fetch(`${DetailsURL}${id}.json`);
  });

  return Promise.all(newList);
}

getPhones(ListURL)
  .then(appendList)
  .then(getPhoneDetails)
  .catch(errorNotification);
