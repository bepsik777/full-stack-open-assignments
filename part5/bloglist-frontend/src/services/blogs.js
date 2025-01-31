import axios from 'axios'
const baseUrl = '/api/blogs'

// class Api {
//   lsKey = 'token'

//   constructor() {
//     this.xhr = axios.create({
//       baseURL: 'https://some-domain.com/api/',
//       timeout: 1000,
//       headers: { 'X-Custom-Header': 'foobar' },
//     })

//     this.#setIntecetors()

//   }

//   #setIntecetors () {
//     this.xhr.interceptors.request.use(function (config) {
//       // Do something before request is sent
//       return config;
//     }, function (error) {
//       // Do something with request error
//       return Promise.reject(error);
//     });
//   }

//   baseRequest(method = 'GET', options) {
//     return this.xhr({
//       ...options,
//       method,
//       headers: {
//         Authorization: this.getAuthHeader(),
//         ...opts?.headers,
//       },
//     })
//   }
//   #getToken() {
//     return localStorage.getItem(this.lsKey)
//   }
//   #setToken(token) {
//     return localStorage.setItem(this.lsKey, token)
//   }

//   getAuthHeader() {
//     return `Bearer ${this.#getToken}`
//   }

//   get(opts) {
//     return this.baseRequest('GET', {
//       ...opts,
//     })
//   }
//   post
//   put
//   patch
//   delete
// }

let token = null

const setToken = (userToken) => {
  token = `Bearer ${userToken}`
}

const blogService = (method, data = {}, url = baseUrl, options) => {
  return axios({
    method,
    url,
    data,
    ...options,
  })
}

const getAll = async () => {
  const res = await blogService('GET')
  return res.data
}

const createBlog = async (data) => {
  const res = await blogService('POST', data, baseUrl, {
    headers: { Authorization: token },
  })
  console.log(res.data, 'res')
  return res
}

const updateBlog = async (data) => {   
  const reqData = {...data, user: data.user.id}
  const res = await blogService('PUT', reqData, `${baseUrl}/${data.id}`, {
    headers: { Authorization: token },
  })
  return res
}

const deleteBlog = async (data) => {
  const reqData = {...data, user: data.user.id}
  const res = await blogService('DELETE', reqData, `${baseUrl}/${data.id}`, {
    headers: { Authorization: token },
  })
  return res
}

export default { getAll, createBlog, setToken, updateBlog, deleteBlog }
