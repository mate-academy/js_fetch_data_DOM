'use strict';

// write your code here
const listUrl
  = 'https://mate-academy.github.io/phone-catalogue-static';

const request = (url) => {
  return fetch(url)
    .then(response => response.json());
};

const getPhonesDetails = (phones) => {
  const ol = document.createElement('ol');

  for (const phone of phones) {
    const li = document.createElement('li');

    li.textContent = phone.name;
    ol.append(li);

    li.addEventListener('click', () => {
      showDetails(phone);
    });

    li.addEventListener('mouseover', (e) => {
      e.target.style.color = '#ed4902';
      e.target.style.cursor = 'pointer';
    });

    li.addEventListener('mouseout', (e) => {
      e.target.style.color = '';
    });
  }

  document.body.append(ol);
};

function showDetails(phone) {
  const existingDiv = [...document.querySelectorAll('.active')];

  for (const el of existingDiv) {
    el.remove();
  }

  const div = document.createElement('div');
  const img = document.createElement('img');
  const p = document.createElement('p');

  div.classList.add('active');
  img.src = `${listUrl}/${phone.imageUrl}`;
  div.append(img);
  p.innerText = phone.snippet;
  div.append(p);

  div.style.cssText = `
    max-width: 400px;
    width: textContent;
    position: absolute;
    left: 30px;
    top: 200px;
    padding: 8px;
    margin: 5px;
    border: solid 1px #FFB0A6FF;
    border-radius: 10px;
    background-color: #fff8f7;
  `;

  document.body.append(div);
}

const getPhones = () => request(`${listUrl}/api/phones.json`);

getPhones()
  .then(getPhonesDetails)
  .catch(logError);

function logError(error) {
  setTimeout(() => {
    throw new Error(`Can't recieve data from server`, error);
  }, 5000);
}
