import tokenService from './tokenService';
import userService from './userService';

const BASE_URL = '/api/v1/stories';

export default {
  index,
  addStory,
  deleteStory,
  getStory,
  editStory,
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

function deleteStory(storyID) {
  if (!userService.getUser()) return;
  return fetch(`${BASE_URL}/${storyID}`, { method: 'DELETE' })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Error deleting story!');
  });
}

function getStory(storyID) {
  if (!userService.getUser()) return;
  return fetch(`${BASE_URL}/${storyID}`)
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Error getting story!');
  });
}

function editStory(storyID, storyInputs) {
  if (!userService.getUser()) return;
  return fetch(`${BASE_URL}/${storyID}/edit`, {
    method: 'PUT',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(storyInputs)
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Error updating story!');
  });
}
