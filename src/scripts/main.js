'use strict';

const url = 'https://mate-academy.github.io/phone-catalogue-static/api';

const getResponse = (endpoint) => {
  return fetch(`${url}/${endpoint}`)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(new Error(`Request status - ${response.status}`));
      }

      if (!response.headers.get('content-type').includes('application/json')) {
        return Promise.reject(new Error('Content type is not supported'));
      }

      return response.json();
    });
};

const renderPhoneInfo = (phone) => {
  const phoneInfoSection = document.querySelector('.phone-info');
  const phoneImgUrl = `https://mate-academy.github.io/phone-catalogue-static/`
    + `${phone.images[0]}`;
  const imageElement = document.createElement('img');

  imageElement.setAttribute('src', phoneImgUrl);
  imageElement.setAttribute('alt', phone.name);
  imageElement.classList.add('phone-info__img');

  imageElement.addEventListener('load', () => {
    const loader = document.querySelector('.loader');

    loader.replaceWith(imageElement);
  });

  phoneInfoSection.innerHTML = `
    <h1>${phone.name}</h1>
    <div class="loader"></div>
    <p>${phone.description}</p>
  `;
};

const renderError = (error) => {
  document.body.innerHTML += `
    <div class="error">
      <div class="error__message">${error}</div>
    </div>
  `;
};

const changeHandler = (e, phones) => {
  if (!e.target.firstElementChild.hasAttribute('disabled')) {
    e.target.firstElementChild.setAttribute('disabled', 'true');
  }

  const selectedPhone = phones.find(phone => phone.name === e.target.value);
  const phoneInfoSection = document.querySelector('.phone-info');

  phoneInfoSection.innerHTML = `
    <div class="loader" />
  `;

  getResponse(`/phones/${selectedPhone.id}.json`)
    .then(phone => renderPhoneInfo(phone))
    .catch(error => renderError(error));
};

const renderRootElement = (phones) => {
  const rootElement = document.querySelector('.root');

  rootElement.innerHTML = `
    <select>
      <option>Please choose a phone</option>
      ${phones.map(phone => `<option>${phone.name}</option>`).join('')}
    </select>
    <section class="phone-info" />
  `;

  const selectPhones = rootElement.firstElementChild;

  selectPhones.addEventListener('change', (e) => changeHandler(e, phones));
};

const root = document.createElement('div');

root.classList.add('root');

root.innerHTML = `
  <div class="loader"></div>
`;
document.body.append(root);

getResponse('/phones.json')
  .then(items => renderRootElement(items))
  .catch(error => setTimeout(() => renderError(error), 5000));
