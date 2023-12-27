import React from 'react'
import { MainHeader } from '../types'

const Header = (props: MainHeader) => {
  return (
    <div>
        <h1>{props.courseName}</h1>
    </div>
  )
}

export default Header