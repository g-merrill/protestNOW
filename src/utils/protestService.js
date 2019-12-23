const BASE_URL = '/api/v1/protests';

function index() {
  return fetch(BASE_URL).then(res => res.json());
}

function getProtestByID(id) {
  return fetch(`${BASE_URL}/${id}`).then(res => res.json());
}

function addProtest(protestInputs, userService) {
  if (!userService.getUser()) return;
  return fetch(`${BASE_URL}/create`, {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(protestInputs)
  })
  .then(res => res.json())
  .catch(err => {
    throw new Error('Error creating protest!');
  });
}

module.exports = {
  index,
  getProtestByID,
  addProtest,
};
