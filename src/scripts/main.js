'use strict';

const url
= 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';

/* const getPhones
  = fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    }); */

const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 5000);

const getPhones
  = fetch(url, { signal: controller.signal })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

clearTimeout(timeoutId);

let html = '';

function getPhonesDetails() {
  try {
    getPhones.then((data) => {
      data.forEach(x => {
        const htmlSegment
        = `<div class="phoneName">
          <p>${x.name}</p>
        </div>`;

        html += htmlSegment;
      });

      const container = document.querySelector('.container');

      container.innerHTML = html;
    });
  } catch (error) {
    throw error;
  }
}

getPhonesDetails();
