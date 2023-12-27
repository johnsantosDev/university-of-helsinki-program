import { Parts } from '../types'
import { assertNever } from '../utils'

const Part = (props: Parts) => {
  return (
    <div>
       {
        props.courses.map((course) => {
            switch(course.kind) {
                case "basic":
                    return <div>
                            <h3>{course.name} {course.exerciseCount}</h3>
                            <p>{course.description}</p>
                        </div>
                    break;  
                case "group":
                    return <div>
                            <h3>{course.name} {course.exerciseCount}</h3> 
                            <p>Project exercises {course.groupProjectCount}</p>
                        </div>; 
                    break;
                case "background": 
                    return <div>
                            <h3>{course.name} {course.exerciseCount}</h3> 
                            <p>{course.description}</p><p>Submit to {course.backgroundMaterial}</p>
                        </div>
                case "special":
                    return <div>
                            <h3>{course.name} {course.exerciseCount}</h3> 
                            <p>{course.description} </p>
                            <p>Required skills {course.requirements.map(r => `${r}, `)}</p>
                        </div>
                default:
                    assertNever(course);
            }
        })
       }
    </div>
  )
}

export default Part