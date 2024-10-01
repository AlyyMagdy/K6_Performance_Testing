import http from 'k6/http';
import { check, sleep } from 'k6';
import { Scenario } from 'k6/execution';

// Scenario 1: Load Testing for 100 users
export let options = {
    scenarios: {
        load_test: {
            executor: 'ramping-vus',
            exec: 'loadTest',
            startVUs: 0,
            stages: [
                { duration: '30s', target: 50 },  // ramp up to 50 users
                { duration: '1m', target: 100 },  // sustain 100 users for 1 minute
                { duration: '30s', target: 0 },   // ramp down to 0 users
            ],
        },
        stress_test: {
            executor: 'ramping-vus',
            exec: 'stressTest',
            startVUs: 0,
            stages: [
                { duration: '1m', target: 100 },  // ramp up to 100 users
                { duration: '2m', target: 150 },  // go beyond the limit to stress test
                { duration: '1m', target: 0 },    // ramp down to 0 users
            ],
        },
    },
};

// Step Definitions
// "Given" Step: Setting the URL and Payload for Login
const BASE_URL = 'https://parabank.parasoft.com/parabank/login.htm';
const payload = {
    username: 'TestUser',
    password: 'Welcome@01',
};
const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

// "When" Step: Load Test Scenario
export function loadTest() {
    let res = http.post(BASE_URL, payload, { headers: headers });

    // "Then" Step: Assertions for Load Testing
    check(res, {
        'status is 200': (r) => r.status === 200,
        'transaction time < 500ms': (r) => r.timings.duration < 500,
    });
    sleep(1);
}

// "When" Step: Stress Test Scenario
export function stressTest() {
    let res = http.post(BASE_URL, payload, { headers: headers });

    // "Then" Step: Assertions for Stress Testing
    check(res, {
        'status is 200': (r) => r.status === 200,
        'response time acceptable': (r) => r.timings.duration < 1000,
    });
    sleep(1);
}
