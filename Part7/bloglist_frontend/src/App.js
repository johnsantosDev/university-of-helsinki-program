import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav, Button } from 'react-bootstrap'

import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import CreateBlog from "./components/CreateBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { createNewBlogs, initializeBlogs } from "./reducers/blogReducer";
import { removeUser, setUser } from "./reducers/currentuserReducer";
import Users from "./components/Users";
import User from "./components/User";
import SingleBlog from "./components/SingleBlog";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [operation, setOperation] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const blogFormRef = useRef();

  const blogsFromStore = useSelector((state) => state.blogs);
  const blogs = [...blogsFromStore];

  const dispatch = useDispatch();

  const currentuser = useSelector((state) => state.currentuser);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  console.log("blogs from store: ", blogs);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const logOutUser = () => {
    dispatch(removeUser());
    window.localStorage.removeItem("loggedInUser");
    setUsername("");
    setPassword("");
  };

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createNewBlogs(blogObject));
  };

  const padding = {
    padding: 5,
  };

  return (
    <div className="container">
      <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/blogs">
                  Blogs
                </Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/users">
                  Users
                </Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                {currentuser ? (
                  <em style={padding}>
                    {currentuser.name} logged in{" "}
                    <Button onClick={logOutUser}>Log out</Button>
                  </em>
                ) : (
                  <Link style={padding} to="/login">
                    Login
                  </Link>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <h1>Blog App</h1>
        <Notification
          operation={operation}
          successMsg={successMsg}
          errorMsg={errorMsg}
        />
        {currentuser && (
          <Togglable buttonLabel="Create blog" ref={blogFormRef}>
            <CreateBlog
              createBlog={addBlog}
              setSuccessMsg={setSuccessMsg}
              setOperation={setOperation}
            />
          </Togglable>
        )}
        <Routes>
          <Route path="/blogs" element={<Blog />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<SingleBlog />} />
          <Route
            path="/login"
            element={
              <Login
                user={currentuser}
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
                setErrorMsg={setErrorMsg}
                setOperation={setOperation}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
