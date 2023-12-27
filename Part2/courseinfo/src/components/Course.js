const Course = ({courses}) => {
    return (
      <>
        {courses.map(course => {
         return (
          <div key={course.id}>
            <h2>{course.name}</h2>
            {course.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)
            }
            <b>total of {course.parts.reduce((previousValue, currentValue) => previousValue + currentValue.exercises, 0)} exercises
            </b>
            <br />
          </div>
         )
        })}
      </>
    )
  }

  export default Course