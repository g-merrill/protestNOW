import tokenService from './tokenService';

const BASE_URL = '/api/v1/users';

function signup(user) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(user)
  })
  .then(res => {
    console.log('Completed the fetch statement.', res)
    if (res.ok) return res.json();
    console.log('Failed the if (res.ok) statement')
    // Probably a duplicate username
    throw new Error('Username already taken!');
  })
  .then(({ token }) => {
    console.log('Just before the tokenService call')
    tokenService.setToken(token);
    console.log('Got past the tokenService call')
  });
}

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

function login(creds) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(creds)
  })
  .then(res => {
    // Valid login if we have a status of 2xx (res.ok)
    if (res.ok) return res.json();
    throw new Error('Bad Credentials!');
  })
  .then(({token}) => tokenService.setToken(token));
}

export default {
  signup,
  getUser,
  logout,
  login,
};
