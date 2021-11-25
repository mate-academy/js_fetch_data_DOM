'use strict';

const url = `https://mate-academy.github`
+ `.io/phone-catalogue-static/api/phones.json`;

function logError(error) {
  setTimeout(() => {
    throw new Error('Can\'t load phones', error);
  }, 5000);
}

function showPhoneDetails(phone, element) {
  const existingDiv = [...document.querySelectorAll('.active')];

  for (const el of existingDiv) {
    el.remove();
  }

  const phoneDetails = document.createElement('div');

  phoneDetails.classList.add('active');
  phoneDetails.innerText = phone.snippet;

  phoneDetails.style.cssText = `
    max-width: 500px;
    width: textContent;
    position: absolute;
    left: 50px;
    top: 50px;
    padding: 8px;
    margin: 5px;
    border: solid 2px #FC4B3B;
    border-radius: 10px;
    background-color: white;
  `;

  document.body.append(phoneDetails);
}

const getPhones = () => {
  return fetch(url)
    .then(response => response.json());
};

const getPhonesDetails = (phonesArray) => {
  const pnonesList = document.createElement('ul');

  for (const phone of phonesArray) {
    const listItem = document.createElement('li');

    listItem.innerText = phone.name;
    pnonesList.append(listItem);

    listItem.addEventListener('click', () => {
      showPhoneDetails(phone, listItem);
    });

    listItem.addEventListener('mouseover', e => {
      e.target.style.color = '#FC4B3B';
      e.target.style.cursor = 'pointer';
    });

    listItem.addEventListener('mouseout', e => {
      e.target.style.color = '';
    });
  }

  document.body.append(pnonesList);
};

getPhones()
  .then(getPhonesDetails)
  .catch(logError);
