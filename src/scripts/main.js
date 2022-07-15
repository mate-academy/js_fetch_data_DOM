'use strict';

const LIST = `
  https://mate-academy.github.io/phone-catalogue-static/api/phones.json
`;
const DETAILS = `
  https://mate-academy.github.io/phone-catalogue-static/api/phones/:phoneId.json
`;

const ul = document.createElement('ul');

document.body.append(ul);

const getPhones = () => {
  return fetch(LIST)
    .then(res => {
      setTimeout(() => {
        if (!res.ok) {
          throw new Error('phones not found');
        }
      }, 5000);

      return res.json();
    });
};

const getPhonesDetails = (phones) => {
  phones.forEach(phone => {
    fetch(DETAILS.replace(':phoneId', phone.id))
      .then(res => {
        if (!res.ok) {
          throw new Error('phones not found');
        }

        return res.json();
      })
      .then(preparedProne => {
        const li = document.createElement('li');

        li.innerText = preparedProne.name;
        li.classList.add('active');

        ul.append(li);
      });
  });
};

getPhones().then(phones => getPhonesDetails(phones));
