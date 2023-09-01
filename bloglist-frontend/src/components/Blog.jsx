import { useState } from "react"
import styles from "../styles/mainStyles"
import services from "../services/blogs"

const Blog = ({ blog }) => {  
  let [showDetails,setShowDetails] = useState(false)
  let [likes, setLikes] = useState(blog.likes)
  const updateDetailsVisibility = () => {
    setShowDetails(!showDetails);
  }

  const like = async () => {
    let liked = await services.like(blog.id,{likes : blog.likes + 1,type : "like"},window.localStorage.getItem("userToken"));
    console.log("liked",liked);
    setLikes(likes + 1)
  }

  let currentButton = <button></button>
  currentButton = showDetails? <button onClick={updateDetailsVisibility}>Hide</button> : <button onClick={updateDetailsVisibility}>Show</button>
  let details = <p></p>;
  details = showDetails ? (<div>
    <p>Author {blog.author} </p>
    <p>Link : <a href={ blog.url }> {blog.url} </a></p>
    <p>Likes : {likes} <button onClick={like} >Like</button></p>
  </div>) : <div></div>

  return (
    <div style={styles.blogStyle}>
      <h3>Title : {blog.title} {currentButton} </h3>
      {details}
    </div>  
  )
}

export default Blog