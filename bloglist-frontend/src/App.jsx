import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Notification from "./components/Notification"

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

  const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title,setTitle] = useState('');
  const [author,setAuthor] = useState('');
  const [url,setUrl] = useState('')
  const [showNotification,setShowNotification] = useState(false)
  const [notificationText,setNotificationText] = useState('')
  const [notifType,setNotifType] = useState('')
  
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
    try {
      let published = await blogService.publish(blogData,userToken);
      console.log("published")
      if(published.status === 201){
        setNotificationText('A new blog! ' + title + " posted by " + author );
        setNotifType("success");
        setShowNotification(true);
        setTimeout(()=>{
          setShowNotification(false);
        }, 5000)
        setTitle('');
        setAuthor('');
        setUrl('');
        setBlogs(blogs.concat(blogData))
      }      
    }
    catch (err){
      alert("session time out. login again to publish post")
      setUserToken(null)
    }

  }

  if(userToken !== null){
    return (
      <div>
        <Notification type={notifType} text={notificationText} showNotification={showNotification} />
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
        <p>{window.localStorage.getItem("username")} is logged in <button>Logout</button></p>
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