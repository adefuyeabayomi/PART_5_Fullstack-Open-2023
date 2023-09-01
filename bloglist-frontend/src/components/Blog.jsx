import styles from "../styles/mainStyles"

const Blog = ({ blog }) => (
  <div style={styles.blogStyle}>
    <h3>Title : {blog.title} </h3>
    <p><i>by </i>{ blog.author }. Find it here <a href={ blog.url }>Link</a></p>
  </div>  
)

export default Blog