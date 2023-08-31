import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const publish = (data,token) => {
  return axios.post(baseUrl,data,{
    headers : {
      Authorization : token
    }
  })
}
export default { getAll, publish }