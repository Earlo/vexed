import axios from 'axios'
import {getOr} from '../helpers'
import {call, put, take} from 'redux-saga/effects'
// -----------------------
//       actions
// -----------------------
const FETCH = 'api/FETCH'
const COMPLETE = 'api/COMPLETE'

// -----------------------
//   action creators
// -----------------------
export const getCountries = () => ({type: FETCH, resource: 'countries'})
// -----------------------
//        reducer
// -----------------------
export default function reducer(state = {},  action = {}) {
  switch (action.type) {
    case FETCH:
      return {
        ...state,
        [action.resource]: {status: 'in_progress'}
      }
    case COMPLETE:
      return {
        ...state,
        [action.resource]: {status: 'completed'}
      }
    default:
      return state
  }
}
// -----------------------
//        selectors
// -----------------------
export const isLoading = state => getOr(`api.countries.status`, false, 'in_progress') === 'in_progress'
// -----------------------
//        sagas
// -----------------------

export function* request(){
  yield take(FETCH)
  const {data} = yield call(asd)
  yield put({type: COMPLETE, resource: 'countries', data})
  return data
}

export function asd(){
  return axios('api/countries')
}

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
