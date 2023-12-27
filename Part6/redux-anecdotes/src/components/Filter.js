//import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'

import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
    //const dispatch = useDispatch()

    const handleChange = (event) => {
      const filterInput = event.target.value
      //dispatch(setFilter(filterInput)) 
      props.setFilter(filterInput)
    }

    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }

  const mapDispatchToProps = {
    setFilter
  }
  
  export default connect(null, mapDispatchToProps)(Filter)