const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/api';
const ENDPOINTS = {
  phones: '/phones.json',
  phoneById: id => `/phones/${id}.json`,
};

function request(url) {
  return fetch(url).then(response => Promise.resolve(response.json()));
}

export function getPhones() {
  return request(`${BASE_URL}${ENDPOINTS.phones}`);
}

export function getPhonesDetails(ids) {
  return Promise.all(ids.map(id => {
    return request(`${BASE_URL}${ENDPOINTS.phoneById(id)}`);
  }));
}
