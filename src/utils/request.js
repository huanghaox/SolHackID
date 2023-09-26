import {Service} from './Service'
export function getConfigsByProductId(productId) {
  return Service({
    url: '/manager/getConfigsByProductId',
    params: { productId: productId }
  })
}
export function getAllAndroidPlugins(code) {
  return Service({
    url: `/github/callback?code=${code}`,
    method: 'get'
  })
}
export function addNewAndroidPlugin(data) {
  return Service({
    url: '/manager/addAndroidPlguin',
    data: JSON.stringify(data)
  })
}
