const baseUrl = process.env.REACT_APP_API_BASE_URL

const paths = {
  auth: { login: '/users/login', register: '/users/register' },
  user: { getProfile: '/users/' },
  courses: {
    getAllCourses: '/courses',
    getUserCourses: '/users/courses',
    registerCourse: '/courses/registerCourse',
    unregister: '/users/courses/unregister'
  },
  swaps: { getSwapsForUser: '/courses/swaps' }
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

function getProfile (userId, authToken) {
  return fetch(`${baseUrl}${paths.user.getProfile}${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  }).then(res => res.json())
}

function getCourses (authToken) {
  return fetch(`${baseUrl}${paths.courses.getAllCourses}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  }).then(res => res.json())
}

function getCoursesForUser (authToken, userId) {
  return fetch(`${baseUrl}${paths.courses.getUserCourses}?userId=${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  }).then(res => res.json())
}

function registerCourse (authToken, userId, course) {
  return fetch(`${baseUrl}${paths.courses.registerCourse}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({ ...course, userId })
  }).then(res => res.json())
}

function getSwapsForUser (authToken) {
  return fetch(`${baseUrl}${paths.swaps.getSwapsForUser}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  }).then(res => res.json())
}

function unregisterFromCourse (userId, courseId, authToken) {
  return fetch(`${baseUrl}${paths.courses.unregister}?userId=${userId}&courseId=${courseId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  }).then(res => res.json())
}

export default {
  login, register, getProfile, getCourses, getCoursesForUser, registerCourse, getSwapsForUser, unregisterFromCourse
}
