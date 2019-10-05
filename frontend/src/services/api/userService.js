const baseUrl = process.env.REACT_APP_API_BASE_URL

const paths = {
  auth: { login: '/users/login', register: '/users/register' }
}

function login (email, password) {
  return fetch(`${baseUrl}${paths.auth.login}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: email, password })
  }).then(res => res.json())
}

function register (email, password, profile) {
  return fetch(`${baseUrl}${paths.auth.register}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: email, password, name: `${profile.firstName} ${profile.lastName}`, role: 'student'
    })
  }).then(res => res.json())
}

export default { login, register }
