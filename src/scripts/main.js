'use strict';

// write your code here

const urlList = `
  https://mate-academy.github.io/phone-catalogue-static/api/phones.json
`;
const urlDetails = `
  https://mate-academy.github.io/phone-catalogue-static/api/phones/:phoneId.json
`;
const ul = document.createElement('ul');

document.body.append(ul);

const getPhones = () => {
  return fetch(urlList)
    .then(response => {
      setTimeout(() => {
        if (!response.ok) {
          throw new Error('Whoops! Time passed!');
        }
      }, 5000);

      return response.json();
    });
};

const getPhonesDetails = (list) => {
  list.forEach(phone => {
    fetch(urlDetails.replace(':phoneId', phone.id))
      .then(response => {
        if (!response.ok) {
          throw new Error('Whoops! Some error!');
        }

        return response.json();
      })
      .then(details => {
        const li = document.createElement('li');

        li.innerText = details.name;
        ul.append(li);
      });
  });
};

getPhones()
  .then(phones => getPhonesDetails(phones));
