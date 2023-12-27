import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const Blog = () => {
  const blogsFromStore = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.currentuser);
  const blogs = [...blogsFromStore];

  if (user !== null) {
    return (
      <>
        <Table style={{marginTop: 20}} striped>
          <tbody>
            {blogs
              .sort((a, b) => a.likes - b.likes)
              .map((blog) => {
                return (
                  <tr key={blog.id}>
                    <td>
                      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </td>
                    <td>{blog.author}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </>
    );
  }
};

export default Blog;
