import withAxios from "../utils/withAxios";
const apiConfig  = [
  {name:'userLogin',url:'/api/login',method:'post'},
  {name:'loadAvatar',url:'/test/loadAvatar',method:'get'}
  ]
export default withAxios(apiConfig)
