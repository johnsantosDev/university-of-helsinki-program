const Header = ({course}) => {

  return (
    <>
    <h2>{course}</h2>
    </>
  )

}

const Content = ({parts}) => {
  {parts.map((value, index) => <p key={index}>{`${value.name} ${value.exercises}`}</p>)}
 return (
  <>
    <Part parts={parts}/>
  </>
 )
}

const Total = ({total}) => {
  return (
    <>
    <p>Number of exercises {total}</p>
    </>
  )

}

const Part = ({parts}) => {

  return (
    <>
    {parts.map((value, index) => <p key={index}>{`${value.name} ${value.exercises}`}</p>)}
    </>
  )

}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  let totalExercises = 0; 
  course.parts.forEach(value => totalExercises += value.exercises)

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total total={totalExercises}/>
    </div>
  )
}

export default App