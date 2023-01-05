import React from 'react'
import MenuHome from '../../Components/MenuHome/MenuHome'
import {useFormik} from 'formik';
import * as yup from 'yup'
import { useDispatch } from 'react-redux';
import { registerApi } from '../../redux/reducers/userReducer';


const  Register = () => {
  const dispatch=useDispatch();
  const form=  useFormik({
    enableReinitialize: true,
    initialValues:{
      email:'fgertertwer',
      password:'erfsdafsd',
      name:'',
      phone:'',
      gender:'',
      confirmPassword:''
    }, validationSchema:yup.object().shape({
      email:yup.string().required('Email cannot be blank!').email('Email is invalid!'),
      password:yup.string().required('Password cannot be blank!'),
      name:yup.string().required('Name cannot be blank!'),
      phone:yup.string().matches(/^[0-9]+$/).required('Phone cannot be blank!'),
      confirmPassword:yup.string().required('Confirm Password is required').oneOf([yup.ref('password')], 'Passwords must match'),
      gender:yup.string().required('gender cannot be blank!')
    }),
    onSubmit: (values) => {
      const actionAsync = registerApi(values);
      dispatch(actionAsync);
    }
  })
  
  const handleRadioButtons = e => {form.values.gender = e.target.value}

  return (
    <div>

<div className="register mb-5">
  <div className="container">
    <h2>Register</h2>
    <form action className="row ms-5 " onSubmit={form.handleSubmit}>
      <div className="left col-md-6">
        <div className="textInput">
          <input name='email' onChange={form.handleChange} onBlur={form.handleBlur} className="input" placeholder="Your Email" />
          <div className="validation" id="validationEmail">{form.errors.email && <span className='text-danger'>(*)</span>}</div>
        </div>
        {form.errors.email && <p className='text-danger'>{form.errors.email}</p>}
        <div className="textInput">
          <input placeholder="Password" onChange={form.handleChange} onBlur={form.handleBlur} type="password" name='password' className="input" />
          <div className="validation" id="validationPassword">{form.errors.password && <span className='text-danger'>(*)</span>}</div>
        </div> 
        {form.errors.password && <p className='text-danger'>{form.errors.password}</p>}
        <div className="textInput">
          <input placeholder="Password  Confirm" onChange={form.handleChange} onBlur={form.handleBlur} type="password" name="confirmPassword" className="input" />
          <div className="validation" id="validationPasswordComfirm">{form.errors.confirmPassword && <span className='text-danger'>(*)</span>}</div>
        </div>
        {form.errors.confirmPassword && <p className='text-danger'>{form.errors.confirmPassword}</p>}
      </div>
      <div className="right col-md-6">
        <div className="textInput">
          <input type="text" id="txtName" onChange={form.handleChange} onBlur={form.handleBlur} name='name' className="input " placeholder="Your Name" />
          <div className="validation" id="validationName">{form.errors.name && <span className='text-danger'>(*)</span>}</div>
        </div>
        {form.errors.name && <p className='text-danger'>{form.errors.name}</p>}

        <div className="textInput">
          <input type="text" placeholder="Your Phone" onChange={form.handleChange} onBlur={form.handleBlur} name='phone' id="numberPhone" className="input" />
          <div className="validation" id="validationPhone">{form.errors.phone && <span className='text-danger'>(*)</span>}</div>
        </div>
        {form.errors.phone && <p className='text-danger'>{form.errors.phone}</p>}

        <div className="inputGender d-md-flex justify-content-start align-items-center mb-4 py-2">
          <h6 className="mb-0 me-4">Gender: </h6>
          <div className="form-check form-check-inline mb-0 me-4">
            <input className="form-check-input"   onChange={e => handleRadioButtons(e)} value='true' type="radio" name="inlineRadioOptions" id="maleGender" defaultValue="true" />
            <label className="form-check-label" htmlFor="maleGender">Male</label>
          </div>
          <div className="form-check form-check-inline mb-0 me-4">
            <input className="form-check-input"   onChange={e => handleRadioButtons(e)} value='false' type="radio" name="inlineRadioOptions" id="femaleGender" defaultValue="false" />
            <label className="form-check-label" htmlFor="femaleGender">Female</label>
          </div>
        </div>
        {form.errors.gender && <p className='text-danger'>{form.errors.gender}</p>}
        
        <div className="btn-submit">
          <button type='submit' className="submit" id="btnSubmit">Submit form</button>
        </div>
      </div>
    </form>
  </div>
</div>

    </div>
  )
}

export default Register