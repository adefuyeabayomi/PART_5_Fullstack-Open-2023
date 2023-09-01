import { useState } from "react"
import styles from "../styles/mainStyles"

const Blog = ({ blog }) => {  
  let [showDetails,setShowDetails] = useState(false)

  const updateDetailsVisibility = () => {
    setShowDetails(!showDetails);
  }
  let currentButton = <button></button>
  currentButton = showDetails? <button onClick={updateDetailsVisibility}>Hide</button> : <button onClick={updateDetailsVisibility}>Show</button>
  let details = <p></p>;
  details = showDetails ? (<div>
    <p>Author {blog.author} </p>
    <p>Link : <a href={ blog.url }> {blog.url} </a></p>
    <p>Likes : {blog.likes} <button>Like</button></p>
  </div>) : <div></div>

  return (
    <div style={styles.blogStyle}>
      <h3>Title : {blog.title} {currentButton} </h3>
      {details}
    </div>  
  )
}

export default Blog