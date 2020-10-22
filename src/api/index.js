import axios from 'axios'

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

const BASE_URL = 'http://18.217.51.236/apis/'
// const BASE_URL = 'http://192.168.1.4:30001/apis/'


POST = (url, params) => {
  return axios.post(`${BASE_URL}${url}`, params, config)
}

GET = (url, params) => {
  return axios.get(`${BASE_URL}${url}`, params, config)
}

export default {
  POST,
  GET,
}