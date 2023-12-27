import React from 'react'
import { Parts } from '../types'
import Part from './Part'

const Content = (props: Parts) => {
  return (
    <div>
        <Part courses = {props.courses}/>
    </div>
  )
}

export default Content