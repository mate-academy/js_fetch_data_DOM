'use strict';

const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static';

function request(url) {
  return fetch(`${BASE_URL}${url}`)
    .then(response => response.json());
};

function getPhonesDetail(phoneArray) {
  const ol = document.createElement('ol');

  for (const phone of phoneArray) {
    const li = document.createElement('li');

    li.textContent = phone.name;
    ol.append(li);

    li.addEventListener('click', () => {
      showPhoneDetails(phone);
    });

    li.addEventListener('mouseover', (e) => {
      e.target.style.color = '#ff0000';
      e.target.style.cursor = 'pointer';
    });

    li.addEventListener('mouseout', (e) => {
      e.target.style.color = '';
    });
  }

  document.body.prepend(ol);
}

function getIds(phoneArray) {
  const ol = document.createElement('ol');

  for (const phone of phoneArray) {
    const li = document.createElement('li');

    li.textContent = phone.id;
    ol.append(li);
  }

  document.body.append(ol);
}

function showPhoneDetails(phone) {
  const previousDivs = [...document.querySelectorAll('.active')];

  for (const el of previousDivs) {
    el.remove();
  }

  const div = document.createElement('div');
  const img = document.createElement('img');
  const p = document.createElement('p');

  div.classList.add('active');
  img.src = `${BASE_URL}/${phone.imageUrl}`;
  div.append(img);
  p.textContent = phone.snippet;

  div.append(p);
  document.body.prepend(div);
}

function logError(error) {
  setTimeout(() => {
    throw new Error(`Can't recieve data from server`, error);
  }, 5000);
}

const getPhones = () => request('/api/phones.json');
const getPhonesIDs = () => request('/api/phones.json');

getPhones()
  .then(getPhonesDetail)
  .catch(logError);

getPhonesIDs()
  .then(getIds)
  .catch(logError);
