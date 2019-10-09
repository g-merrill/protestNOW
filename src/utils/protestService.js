import userService from './userService';

const BASE_URL = '/api/v1/protests';

function index() {
  return fetch(BASE_URL).then(res => res.json());
}

function addProtest(protestInputs) {
  if (!userService.getUser()) return;
  return fetch(`${BASE_URL}/create`, {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(protestInputs)
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Error creating protest!');
  });
}

export default {
  index,
  addProtest,
};
