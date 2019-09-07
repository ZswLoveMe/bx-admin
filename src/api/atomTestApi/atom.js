import {get,post} from '../api'

export function pageQuery(params) {
  let url = '/route/pageQuery'
 return get(url, params)
}
