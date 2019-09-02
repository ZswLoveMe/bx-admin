import axios from 'axios'

/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function get(url, params){    
    return new Promise((resolve, reject) =>{        
        axios.get(url, {            
            params: params        
        }).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data)        
    })    
});}

/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        console.log(JSON.stringify(params))
         axios.post(url, JSON.stringify(params))
        .then(res => {
            resolve(res.data);
        })
        .catch(err =>{
            reject(err.data)
        })
    });
}

function loadeAvatar(params){
    let url = 'test/loadAvatar'
    return get(url,params)
}

function login(params){
    let url = '/api/login'
    return post(url,params)
}

export {
    loadeAvatar,
    login
}