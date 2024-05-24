import React, { useState } from 'react'
import Calendar from 'react-calendar'

function Cale() {
    const[value, onChange] = useState(new Date())
  return (
    <div>
      <h1>Calendar using React</h1>
      <Calendar 
        onChange={onChange}
        value={value}
      />
    </div>
  )
}

export default Cale;