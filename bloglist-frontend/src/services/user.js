import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users'

const signUp = (data) => {
  const request = axios.post(baseUrl,data);
   return request.then(response=> {
    console.log("response", response)
    return response;
   });
}
const login = (data) => {
    const request = axios.post("http://localhost:3003/api/login/",data);
    return request.then(response => {
        return response;
    })
}
export default { signUp , login }