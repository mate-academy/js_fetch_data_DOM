// eslint-disable-next-line strict
const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/api';

const request = (url, duration = 0) => {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}${url}`).then((res) => {
      if (!res.ok) {
        reject(new Error(`${res.status}: ${res.statusText}`));
      }

      if (!res.headers.get('content-type').includes('application/json')) {
        reject(new Error('unsupported file type'));
      }

      resolve(res.json());

      if (duration) {
        setTimeout(() => {
          reject(new Error('timeout'));
        }, duration * 1000);
      }
    });
  });
};

module.exports = request;
