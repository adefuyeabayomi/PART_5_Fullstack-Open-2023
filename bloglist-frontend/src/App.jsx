import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import userService from "./services/user"

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

  const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title,setTitle] = useState('');
  const [author,setAuthor] = useState('');
  const [url,setUrl] = useState('')
  
  const [userToken,setUserToken] = useState(window.localStorage.getItem("userToken"))
    useEffect(() => {
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )  
    }, [userToken])

  const handleTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value)
  }
  const handleAuthor = (e) => {
    e.preventDefault();
    setAuthor(e.target.value)
    
  }
  const handleUrl = (e) => {
    e.preventDefault();
    setUrl(e.target.value)
  }
  const publishBlog = async () => {
    let blogData = {
      url , title , author , likes : 0
    }
    console.log("user token", userToken)
    let published = await blogService.publish(blogData,userToken);
    console.log("published",)
    if(published.status === 201){
      alert("successfully published post");
      setTitle('');
      setAuthor('');
      setUrl('');
      setBlogs(blogs.concat(blogData))
    }
  }

  if(userToken !== null){
    return (
      <div>
        <div>
          <h3>Create a new blog post</h3>
          <div>
            <form style={formStyle}>
              <p>Title : <input value={title} onChange={handleTitle}/> </p>
              <p>Author : <input value={author} onChange={handleAuthor}/> </p>
              <p>Url : <input value={url} onChange={handleUrl}/> </p>
            </form>
            <button style={buttonStyle} onClick={publishBlog}>Publish new blog post</button>
          </div>
        </div>
        <h2>blogs</h2>
        <p>{window.localStorage.getItem("username")} is logged in</p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
  else return (
    <div>
      <LoginForm setUserToken={setUserToken}/>
    </div>
  )

}

export default App