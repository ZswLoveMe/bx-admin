export default {
    userInfo:JSON.parse(localStorage.getItem("userInfo")||'{}')  ,
    token:localStorage.getItem("token") || null
}
