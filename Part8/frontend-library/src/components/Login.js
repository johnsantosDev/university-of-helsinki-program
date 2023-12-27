import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login, result] = useMutation(LOGIN)

    useEffect(() => {
        if(result.data) {
            const token = result.data.login.value
            console.log('token', token)
            props.setToken(token)
            localStorage.setItem('token', token)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result.data])

    const submit = (event) => {
        event.preventDefault()
        login({
            variables: {username, password}
        })
    }

    if(!props.show) {
        return null
    }

  return (
    <div>
        <form onSubmit={submit}>
        <div>
          username{' '}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{' '}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login