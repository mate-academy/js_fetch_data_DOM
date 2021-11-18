'use strict';

const API_URL = 'https://mate-academy.github.io/phone-catalogue-static/api';

const request = async (path) => {
  const response = await fetch(`${API_URL}${path}`);

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  const data = await response.json();

  return data;
};

const getPhones = () =>
  Promise.race([
    request('/phones.json'),
    new Promise((resolve, reject) => {
      setTimeout(
        () => reject(new Error('Takes too long to get the data from API')),
        5000
      );
    }),
  ]);

const getPhoneDeatil = (phoneId) => request(`/phones/${phoneId}.json`);

const parseIds = (phones) => {
  const ids = phones.map((phone) => phone.id);

  return ids;
};

const getPhoneDeatils = (phoneIds) => {
  return Promise.all(phoneIds.map((phoneId) => getPhoneDeatil(phoneId)));
};

const createPhoneSelect = () => {
  const phonePicker = document.createElement('div');

  phonePicker.className = 'phone-picker';

  phonePicker.innerHTML = `
  <select name="phones" size="4" id="phoneSelect">
    <option value="">Please choose a phone</option>
  </select>

  <button id="button">Show phone info</button>`;

  document.body.append(phonePicker);
};

const populatePhoneSelect = (phoneDetails, phoneSelect) => {
  phoneSelect.insertAdjacentHTML(
    'beforeend',
    `
    ${phoneDetails.map(({ name: phoneName }) => `
      <option value="${phoneName}">
        ${phoneName}
      </option>
    `).join('')}`
  );
};

const createInfoElement = () => {
  const phoneInfo = document.createElement('article');

  phoneInfo.className = 'phone-info';

  return phoneInfo;
};

const showPhoneInfo = (details, phoneInfo, phoneSelect) => {
  const selectedPhoneName = phoneSelect.value;

  if (!selectedPhoneName) {
    return;
  }

  const selectedPhone = details.find(
    (phone) => phone.name === selectedPhoneName
  );

  phoneInfo.innerText = selectedPhone.description;
  document.body.append(phoneInfo);
};

const generateDetailsInformer = async () => {
  try {
    const phones = await getPhones();
    const ids = await parseIds(phones);
    const details = await getPhoneDeatils(ids);

    const phoneSelect = document.getElementById('phoneSelect');
    const button = document.getElementById('button');
    const phoneInfo = createInfoElement();

    populatePhoneSelect(details, phoneSelect);

    button.addEventListener('click', () => {
      showPhoneInfo(details, phoneInfo, phoneSelect);
    });
  } catch (error) {
    console.error(error.message);
  }
};

createPhoneSelect();
generateDetailsInformer();
