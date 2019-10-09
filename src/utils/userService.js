import tokenService from './tokenService';

const BASE_URL = '/api/v1/users';

function index() {
  return fetch(BASE_URL).then(res => res.json());
}

// function getSingleUserData(mongoID) {
//   return fetch(`${BASE_URL}/${mongoID}`).then(res => res.json());
// }

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
  .then(({ token }) => {
    tokenService.setToken(token);
  });
}

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

function login(creds) {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(creds)
  })
  .then(res => {
    // Valid login if we have a status of 2xx (res.ok)
    if (res.ok) return res.json();
    throw new Error('bad credentials');
  })
  .then(({ token }) => tokenService.setToken(token));
}

export default {
  index,
  // getSingleUserData,
  signup,
  getUser,
  logout,
  login,
};
