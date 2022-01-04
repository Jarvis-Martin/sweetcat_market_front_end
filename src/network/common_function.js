import RestTemplate from '../network/network'
import { GET, POST } from './request_methods';

const restClient = new RestTemplate()
export const getData = (method, path, requestConfig) => {
  return new Promise((resolve, reject) => {
    switch (method) {
      case GET: {
        restClient.get(path, requestConfig).then(result => resolve(result)).catch(err => reject(err));
        break
      }
      case POST: {
        restClient.post(path, requestConfig).then(result => resolve(result)).catch(err => reject(err));
        break
      }
    }
  })
}