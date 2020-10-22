const initialState = {
  isLoading: false,  
  token: null,
  error: null,
  task: '',
};

import { Alert } from 'react-native'

export const SagaReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'REQ_SIGNIN':
      return {...state, isLoading: true, task: 'signin'}
    case 'RES_SIGNIN':
      return {...state, isLoading: false, token: action.payload.token}
    case 'RES_FAIL':
      setTimeout(() => {
        Alert.alert('エラー', action.payload)
      }, 200)      
      return {...state, isLoading: false, error: action.payload}
    default: return state;
  }
}