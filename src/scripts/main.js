'use strict';

// write your code here
const BASE_URL
= 'https://mate-academy.github.io/phone-catalogue-static/api/phones';
const url = `${BASE_URL}.json`;
const body = document.querySelector('body');
const list = document.createElement('ul');

list.style.backgroundColor = `#afe125`;

list.innerHTML = `
  <h3>Phones ID</h3>
`;
body.append(list);

const listDetails = document.createElement('ul');

listDetails.style.backgroundColor = `#64fade`;

listDetails.innerHTML = `
  <h3>Phone names with details<br>
  (please click on the name to see the description)</h3>
`;
body.insertAdjacentElement('afterbegin', listDetails);

const ul = document.querySelectorAll('ul');

[...ul].map(el => {
  el.style.margin = `8px`;
  el.style.padding = `0 8px 16px 24px`;
  el.style.borderRadius = `8px`;
  el.style.width = `35%`;
});

function getPhones() {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        return setTimeout(() => {
          // eslint-disable-next-line no-console
          console.warn(`Error: ${response.status}`);
        }, 5000);
      }

      return response.json();
    });
};

function getPhonesDetails(ids) {
  return fetch(`${BASE_URL}/${ids}.json`)
    .then(response => {
      if (!response.ok) {
        // eslint-disable-next-line no-console
        return console.warn(`Error: ${response.status}`);
      }

      return response.json();
    });
}

const detailArray = [];
const phonesWithDetails = [];

getPhones()
  .then(phones => {
    const phonesIds = phones.map(item => getPhonesDetails(item.id));

    Promise.all(phonesIds)
      .then(details => {
        details.map(el => {
          detailArray.push(el);

          const text = `<li>${el.id}</li>`;

          list.insertAdjacentHTML('beforeend', text);

          phones.map(item => {
            if (item.id === el.id) {
              item.detail = el;
              phonesWithDetails.push(item);
            }
          });
        });

        phonesWithDetails.map(phone => {
          const nameText = `
          <li class="tree" style="cursor: pointer">
            ${phone.name}
            <ul hidden>${phone.detail.description}</ul>
          </li>`;

          listDetails.insertAdjacentHTML('beforeend', nameText);
        });

        const tree = document.querySelectorAll('.tree');

        const hideShow = (el) => {
          const item = el.target;
          const element = item.firstElementChild;

          if (element.hidden === false) {
            element.hidden = true;
          } else {
            element.hidden = false;
          }
        };

        [...tree].map(elem => {
          elem.addEventListener('click', hideShow);
        });
      });
  });
