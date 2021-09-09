'use strict';

const url = 'https://mate-academy.github.io/phone-catalogue-static/api/phones';

const list = document.createElement('ul');

document.body.append(list);

function makeLi(text) {
  const li = document.createElement('li');

  li.innerText = text;

  list.append(li);
}

function getPhones() {
  return fetch(url + '.json')
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
    return fetch(url + `/${someId}.json`)
      .then(somePhone => somePhone.json())
      .catch(error => alert('Error:', error));
  });

  return Promise.all(arrayOfPromises);
}

getPhones()
  .then(data => getPhonesDetails(data))
  // this promise returns combined data of all phones
  // how can I save it to access it from the upper scope?
  .then(phonesWithDetails => {
    phonesWithDetails.forEach(phone => {
      makeLi(phone.name);
    });
  });
