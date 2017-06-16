import axios from 'axios'

// -----------------------
//       actions
// -----------------------
export function getCountries(){
  return axios('api/countries')
}

export function getFlag(countryId){
  return axios(`flags/${countryId.toLowerCase()}.png`)
}

// -----------------------
//   action creators
// -----------------------

// -----------------------
//        reducer
// -----------------------

// -----------------------
//        selectors
// -----------------------

// -----------------------
//        sagas
// -----------------------

// -----------------------
//      side effects
// -----------------------

// feel free to make this in a different way.
// But you probably want to isolate your api calls in a helper

function apiAction(action, url, payload) { // eslint-disable-line no-unused-vars
  if (payload) {
    if (url.includes('login') || url.includes('auth')) {
      return axios[action](url, payload)
    }
    /* const token = getAuthToken()
    if (token) {
      return axios[action](`${url}?token=${token}`, payload)
    } */
  }
  return axios[action](url)
}
