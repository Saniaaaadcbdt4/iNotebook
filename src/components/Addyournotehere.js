import React from 'react'
import Notes from './Notes'


const Addyournotehere = (props) => {
    const showAlert=props.showAlert;
  return (
    <div>
     <Notes showAlert={showAlert} />
     
    </div>
  )
}

export default Addyournotehere;
