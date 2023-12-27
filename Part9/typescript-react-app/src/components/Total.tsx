import React from 'react'
import { TotalExercise } from '../types'

const Total = (props: TotalExercise) => {
  return (
    <div>
        <h3>Number of total exercises: {props.total}</h3>
    </div>
  )
}

export default Total