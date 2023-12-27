import PropTypes from 'prop-types'

import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = ({ username,
  password,
  setUser,
  setUsername,
  setPassword,
  setErrorMsg,
  setOperation
}) => {

  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login({ username, password, })
      setUser(user)
      console.log('user after login: ', user)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setOperation(true)
    } catch(exception) {
      setErrorMsg(exception.response.data.error)
      setOperation(false)
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
    }

  }


  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
            username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            id='username'
          />
        </div>
        <div>
            password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            id='password'
          />
        </div>
        <button type="submit" id='login-button'>login</button>
      </form>
    </>
  )

}

Login.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  setErrorMsg: PropTypes.func.isRequired,
  setOperation: PropTypes.func.isRequired
}

export default Login