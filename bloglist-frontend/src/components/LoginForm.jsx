import userService from "../services/user";
import { useState } from "react";

let formStyle = {
    padding : 10,
    borderRadius : 8,
    border : "1px solid",
    margin : 10
  }
  
  let buttonStyle = {
    marginLeft : 10,
    width : "20%",
    minWidth : 100
  }

const LoginForm = (props) => {
    let [usernameL,setUsernameL] = useState('')
    let [passwordL,setPasswordL] = useState('')
    let [usernameS,setUsernameS] = useState('')
    let [passwordS,setPasswordS] = useState('')
  
    const handleUsernameChangeL =  (e) => {
        e.preventDefault();
        setUsernameL(e.target.value)
    }
    const handlePasswordChangeL = (e) => {
        e.preventDefault();
        setPasswordL(e.target.value);
    }
    const handleUsernameChangeS =  (e) => {
      e.preventDefault();
      setUsernameS(e.target.value)
    }
    const handlePasswordChangeS = (e) => {
      e.preventDefault();
      setPasswordS(e.target.value);
    }
  
    const login = async () => {
      let loginData = {
        username : usernameL,
        password : passwordL
      }
      console.log("logindata", loginData);
      let data = await userService.login(loginData);
      data.status === 200 ? alert("login Successful, you can now create and view blogs") : alert("unable to login now, we are working to fix the issue. Thanks for understanding.")
      if(data.status === 200){
        console.log("data.data",data.data)
        window.localStorage.setItem("userToken",data.data.token)
        window.localStorage.setItem("username",usernameL)
        props.setUserToken(data.data.token)
      }
    }

    const signUp = async () => {
      let signUpData = { 
        username : usernameS,
        password : passwordS,
      }
      console.log("signupdata", signUpData);
      if(usernameS.length < 3 || passwordS.length < 8){
        return alert("To sign up, supply a username more than 3 characters and a password more than 8 characters long. Please try again.")
      }
      else {
        let data = await userService.signUp(signUpData)
        console.log("response data", data)
        data.status === 201 ? alert("Account Created Successfully, Now Proceed to login to create read and create blog posts") : alert("unable to create account. We are working to fix the issue")
        return "Account Created Successfully"
      }
    }
  

  
    return (
        <div>
            <h1>Login</h1>
            <form style={formStyle}>
                <div>
                    <p>Username : <input type="text" name="username" onChange={handleUsernameChangeL} value={usernameL} /></p>
                </div>
                <div>
                    <p>Password : <input type="text" name="username" onChange={handlePasswordChangeL} value={passwordL} /></p>
                </div>
            </form>
            <button style={buttonStyle} onClick={login}>Login</button>
  
            <h1>Sign Up For New Users</h1>
            <form style={formStyle}>
                <div>
                    <p>Username : <input type="text" name="username" onChange={handleUsernameChangeS} value={usernameS} /></p>
                </div>
                <div>
                    <p>Password : <input type="text" name="username" onChange={handlePasswordChangeS} value={passwordS} /></p>
                </div>
            </form>
            <button style={buttonStyle} onClick={signUp}>Sign Up</button>
        </div>
    )
  }
  export default LoginForm;