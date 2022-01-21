'use strict';

const url = 'https://mate-academy.github.io/phone'
  + '-catalogue-static/api/phones.json';
const phoneList = document.querySelector('.phone__list');
const infoImg = document.querySelector('.info__img');
const loader = document.querySelector('.loader');
const info = document.querySelector('.info');
const about = document.querySelector('.info__about');

const getPhones = () => {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        setTimeout(() => {
          loader.hidden = true;
          throw alert(`${response.status} - ${response.statusText || 'error'}`);
        }, 5000);
      } else {
        setTimeout(() => {
          loader.hidden = true;
          info.hidden = false;
        }, 500);

        return response.json();
      }
    });
};

function createList(phones) {
  phones.map(phone => {
    const dataSrc = `https://mate-academy.github.io/phone-catalogue-static/`
    + `${phone.imageUrl}`;

    phoneList.insertAdjacentHTML('afterbegin', `
    <li
      class="phone__item"
      data-id="${phone.id}"
      data-src="${dataSrc}"
      data-info="${phone.snippet}"
    >${phone.id}</li>
    `);
  });
}

getPhones()
  .then(phones => {
    createList(phones);

    infoImg.src = 'https://mate-academy.github.io/'
      + `phone-catalogue-static/${phones[0].imageUrl}`;
    about.textContent = phones[0].snippet;
    phoneList.children[0].classList.add('underline');
  });

phoneList.addEventListener('click', (e) => {
  const item = e.target.closest('.phone__item');
  const itemUnderline = phoneList.querySelector('.underline');

  if (itemUnderline) {
    itemUnderline.classList.remove('underline');
  }
  loader.hidden = false;
  info.hidden = true;

  setTimeout(() => {
    item.classList.add('underline');
    infoImg.src = item.dataset.src;
    about.textContent = item.dataset.info;
    loader.hidden = true;
    info.hidden = false;
  }, 300);
});
