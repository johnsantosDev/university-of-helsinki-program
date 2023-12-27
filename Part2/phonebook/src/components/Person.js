import DeleteButton from "./DeleteButton"


const Person = ({person, fetchdata}) => {
    return <li>
        {person.name} {person.number} 
        <DeleteButton 
            person={person} 
            fetchdata={fetchdata}
        /></li>
}

export default Person