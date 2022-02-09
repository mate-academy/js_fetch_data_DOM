'use strict';

// write your code here

const ListURL = `https://mate-academy.github.io/phone-catalogue-static/api/
  phones.json`;

const DetailsURL = `https://mate-academy.github.io/phone-catalogue-static/api/
  phones/:phoneId.json`;

const list = document.createElement('ul');

document.body.append(list);

function makeLi(text) {
  const li = document.createElement('li');

  li.innerText = text;

  list.append(li);
}

function getPhones() {
  return fetch(ListURL)
    .then(info => info.json())
    .then(data => {
      return data.map(element => element.id);
    })
    .catch(error => {
      return setTimeout(() => {
        alert('Error:', error);
      }, 5000);
    });
}

function getPhonesDetails(idsList) {
  const arrayOfPromises = idsList.map(someId => {
    return fetch(DetailsURL.replace(':phoneId', someId))
      .then(somePhone => somePhone.json())
      .catch(error => alert('Error:', error));
  });

  return Promise.all(arrayOfPromises);
}

getPhones()
  .then(data => {
    return getPhonesDetails(data);
  })
  .then(phonesWithDetails => {
    phonesWithDetails.forEach(phone => {
      makeLi(phone.name);
    });
  });
