1. Replace `<your_account>` with your Github username in the link
    - [DEMO LINK](https://zarg129.github.io/js_fetch_data_DOM/)
2. Follow [this instructions](https://mate-academy.github.io/layout_task-guideline/)
    - There are no tests for this task so use `npm run lint` command instead of `npm test`

### Task: Fetch data

API Urls:
- List URL: https://mate-academy.github.io/phone-catalogue-static/api/phones.json
- Details URL: https://mate-academy.github.io/phone-catalogue-static/api/phones/:phoneId.json

The main goal of this task is practice of fetching data from API.
Your task is create function `getPhones` that should `resolve` with the list of phones or `reject` in `5` second.

After receiving list of phones get all IDs and fetch all details for these phone ids with function `getPhonesDetails`, which takes array of IDs.
`getPhonesDetails` should `resolve` with an array of details of each phone in the list or `reject` on any error.

(optional) Combine all data. Make array `phonesWithDetails`.

Hint: It doesn't matter in what way you choose to notify users about resolved or rejected promises. You can use DOM or `console.log`.
