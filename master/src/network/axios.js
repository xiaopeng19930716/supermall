import axios from 'axios'

export function $http(config) {
  const instance = axios.create({
    baseURL: 'http://110.80.38.74:6661/api/v2',
    timeout: 5000
  })
  return instance(config)
}