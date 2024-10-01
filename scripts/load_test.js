import http from 'k6/http';
import { sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  stages: [
    { duration: '30s', target: 100 },
    { duration: '1m', target: 100 },
    { duration: '30s', target: 0 },
  ],
};

export default function () {
  const url = 'https://parabank.parasoft.com/parabank/login.htm';

  const payload = {
    username: 'TestUser',
    password: 'Welcome@01',
  };

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const response = http.post(url, payload, { headers });

  if (response.status !== 200) {
    console.error(`Request failed with status ${response.status}`);
  }

  sleep(1);
}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}