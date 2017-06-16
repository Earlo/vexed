import {all} from 'redux-saga/effects'
import {request} from './ducks/api-requests' 
export default function* rootSaga() {
  yield all([
    // TODO
    request()
  ])
}
