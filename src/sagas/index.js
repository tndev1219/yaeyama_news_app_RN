import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native'
import Api from '../api'

storeAuthInfo = async (username, password, remember, token) => {
  try {
    await AsyncStorage.setItem('Auth', JSON.stringify({username: username, password: password, remember: remember, token: token}));
  } catch (error) {
    // Error saving data
    console.warn(error)
  }
};

function* signin(action) {
  try {
    let {data} = yield call(Api.POST, 'signin', action.payload)
    console.warn(data)
    if (data.success) {
      if (action.payload.remember == 1) {
        storeAuthInfo(action.payload.username, action.payload.password, action.payload.remember, data.token)
      } else {
        storeAuthInfo('', '', action.payload.remember, data.token)
      }
      yield put({type:'RES_SIGNIN', payload: {...data.result}})
    } else {
      yield put({type:'RES_FAIL', payload: data.message})
    }  
  } catch (err) {
    console.warn(err)
    yield put({type:'RES_FAIL', payload:err.code})
  }
}

export default function * rootSaga() {
  yield takeLatest('REQ_SIGNIN', signin)
}