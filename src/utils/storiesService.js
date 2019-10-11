import tokenService from './tokenService';
import userService from './userService';

const BASE_URL = '/api/v1/stories';

export default {
  index,
  addStory
};

function index() {
  const options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    }
  };
  return fetch(BASE_URL, options).then(res => res.json());
}

function addStory(storyInputs) {
  if (!userService.getUser()) return;
  return fetch(`${BASE_URL}/create`, {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(storyInputs)
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Error creating story!');
  });
}
