import { check, group } from 'k6';
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
  group('Scenario: User logs into the Parabank application', () => {
    const url = 'https://parabank.parasoft.com/parabank/login.htm';

    const payload = {
      username: 'TestUser',
      password: 'Welcome@01',
    };

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const res = http.post(url, payload, { headers });

    check(res, {
      'status is 200': (r) => r.status === 200,
      'response time < 500ms': (r) => r.timings.duration < 500,
    });

    sleep(1);
  });
}
