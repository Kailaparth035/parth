import {take, takeEvery, takeLatest, all} from 'redux-saga/effects';
import {loginSaga} from './LoginSaga';

export default function* root_saga() {
  yield all([
    // takeEvery("LOGIN_REQUEST", loginSaga),
  ]);
}
