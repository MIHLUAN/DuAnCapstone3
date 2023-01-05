import React from 'react'
import {useFormik} from 'formik';
import * as yup from 'yup'
import { loginApi,loginFBApi } from '../../redux/reducers/userReducer';
import { useDispatch } from 'react-redux';
import {NavLink} from 'react-router-dom'
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import { getProfileAction } from '../../redux/reducers/userReducer';
import { history } from '../..';
import { loginAction } from '../../redux/reducers/userReducer';
import { ACCESS_TOKEN, getStore, getStoreJson, http, saveStore, saveStoreJson, USER_LOGIN } from '../../util/config';

const Login = () => {
  const dispatch = useDispatch();
  const form = useFormik({
    initialValues:{
      email:'',
      password:''
    },
    validationSchema:yup.object().shape({
      email:yup.string().required('email cannot be blank!').email('email is invalid!'),
      password:yup.string().required('password cannot be blank!')
    }),
    onSubmit: (values) => {
      const actionAsync = loginApi(values);
      dispatch(actionAsync);
    }
  })
 const responseFacebook = (response) => {
    console.log(response)
    axios({
      url:"https://shop.cyberlearn.vn/api/Users/facebooklogin",
      method:"post",
      data:{
        facebookToken:response.accessToken,
      }
     }).then((res)=>{
       console.log('obDangNhap', res.data.content);
       //Cập nhật cho reducer
       const action = loginAction(res.data.content);
       dispatch(action);
       saveStoreJson(USER_LOGIN, res.data.content);
        localStorage.setItem(ACCESS_TOKEN,res.data.content.accessToken)
        const actionGetProfile = getProfileAction();
        dispatch(actionGetProfile);
        alert('Dang nhap thanh cong!')
        history.push('/profile');
        
     })

 } 
 const onclickFB=(response)=>{
 
   
 }
  return (
    < >  <h3 className='login'>Login</h3>
    <form className='formLogin ' onSubmit={form.handleSubmit}>
    
      <div className='form-group emailLogin'>
        <p>Email</p>
        <input placeholder='email' className='form-control' name="email" onChange={form.handleChange} onBlur={form.handleBlur}/>
        {form.errors.email && <p className='text-danger'>{form.errors.email}</p>}
      </div>
      <div className='form-group passwordLogin'>
        <p>Password</p>
        <input type='password' placeholder='password' className='form-control' name="password" onChange={form.handleChange}   onBlur={form.handleBlur}/>
        {form.errors.password && <p className='text-danger'>{form.errors.password}</p>}

      </div>
      <div className='form-group submitLogin'>
        <NavLink to="/register" className="active registerNow">Register now ?</NavLink>

        <button className='btn btn-success mt-2 btnLogin' type='submit'>LOGIN</button>
      </div>
     
      
    </form>
    <div className='text-center fb-login '>
    <FacebookLogin 
    appId="3501563433422613"
    
    fields="name,email,picture"
    onClick={onclickFB}
    cssClass="my-facebook-button-class"
    callback={responseFacebook} />
    </div>
    </>
    
  )
}

export default Login