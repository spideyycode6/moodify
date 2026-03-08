import React from 'react'

const FormGroup = ( {placeholder, type,value, onChange} ) => {
  return (
    <div className='form-group'>
        <input type={type} placeholder={placeholder} value={value} onChange={onChange} required/>
    </div>  
  )
}

export default FormGroup