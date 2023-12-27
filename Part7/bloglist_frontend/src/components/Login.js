import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";

import loginService from "../services/login";
import blogService from "../services/blogs";
import { setNotification } from "../reducers/notificationReducer";
import { setUser } from "../reducers/currentuserReducer";

const Login = ({
  username,
  password,
  setUsername,
  setPassword,
  setOperation,
}) => {
  const dispatch = useDispatch();
  const currentuser = useSelector((state) => state.currentuser);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      dispatch(setUser(user));
      console.log("user after login: ", user);
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setOperation(true);
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error));
      setOperation(false);
      setTimeout(() => {
        dispatch(setNotification(null));
      }, 5000);
    }
  };

  return (
    <>
      {!currentuser && (
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>username:</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
            <Form.Label>password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <Button variant="primary" type="submit">
              login
            </Button>
          </Form.Group>
        </Form>
      )}
    </>
  );
};

Login.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  setErrorMsg: PropTypes.func.isRequired,
  setOperation: PropTypes.func.isRequired,
};

export default Login;
