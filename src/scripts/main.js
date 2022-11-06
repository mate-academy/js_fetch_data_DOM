'use strict';

// eslint-disable-next-line
const url = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';

const getPhones = () => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => resolve(response.json()));

    setTimeout(() => {
      reject(new Error('Something went wrong'));
    }, 5000);
  });
};

function getPhonesDetails() {
  const container = document.querySelector('.container');

  getPhones().then((data) => {
    data.forEach(phone => {
      const paragraph = document.createElement('p');

      paragraph.append(`${phone.name}`);
      container.appendChild(paragraph);
    });
  })
    .catch();
}

getPhonesDetails();
