const BASE_URL = '/api/v1/users';

function signup(user) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(user)
  })
  .then(res => {
    if (res.ok) return res.json();
    // Probably a duplicate username
    throw new Error('Username already taken!');
  })
  .then(data => data);
}

export default {
  signup
};
