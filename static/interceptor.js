import axios from 'axios'
import store from '../src/store'
import router from '../src/router'

axios.defaults.timeout = 10000

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// let apis = []
// const files = require.context('./api', true, /\.js$/);
//
// files.keys().forEach(key => {
//
//   for (let apiKey in files(key).default) {
//     apis[apiKey] = files(key).default[apiKey]
//   }
// })
// console.log('apis：', apis)
//

axios.interceptors.request.use(config => {
    if (store.state.token) {
        config.headers.token = store.state.token
    }
    return config
})







axios.interceptors.response.use(response => {
    console.log(response)
    if (response.status == 200) {
        console.log(response.data.code)
        if (response.data.code == -1) {
            clearHandler()
        }
        return Promise.resolve(response);
    } else {
        return Promise.reject(response);
    }
}, error => {
    if (error.response.status) {
        switch (error.response.status) {
            // 401: 未登录
            // 未登录则跳转登录页面，并携带当前页面的路径
            // 在登录成功后返回当前页面，这一步需要在登录页操作。
            case 401:
                clearHandler()
                break;
            // 403 token过期
            // 登录过期对用户进行提示
            // 清除本地token和清空vuex中token对象
            // 跳转登录页面
            case 403:
                this.$message({
                    showClose: true,
                    message: '登录过期，请重新登录',
                    type: 'error'
                });
                // 清除token
                localStorage.removeItem('token');
                // 清空缓存
                store.commit("setToken", "");
                // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                setTimeout(() => {
                    router.replace({
                        path: '/login',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });
                }, 1000);
                break;

            // 404请求不存在
            case 404:
                this.$message({
                    showClose: true,
                    message: '网络请求不存在',
                    type: 'error'
                });
                break;
            // 其他错误，直接抛出错误提示
            default:
                this.$message({
                    showClose: true,
                    message: error.response.data.message,
                    type: 'error'
                });
        }
        return Promise.reject(error.response);
    }
})
function clearHandler() {
    // 清空缓存
    store.commit("setToken", "");
    localStorage.removeItem("token");

    // 跳转至登录页
    router.push({
        path: "/login",
        query: {
            redirect: router.currentRoute.path
        }
    });
}



//

