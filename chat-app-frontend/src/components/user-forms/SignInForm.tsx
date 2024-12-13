import { useLazyQuery } from '@apollo/client';
import './SignInForm.css'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SIGN_IN } from '../../queries/users.query';
import {jwtDecode} from 'jwt-decode';

interface JwtPayloadType{
  emailId: string,
  userId: string,
  userFullName: string,
  exp: number,
  iat: number
}

export const SignInFormComponent = () => {
    const [signInError, setSignInError] = useState('');
    const navigate = useNavigate();
    const registerFunctionHandler = () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      navigate('/register');
    }
  
    const { register, handleSubmit, formState: { errors } } = useForm();
  
    const [loginUser] = useLazyQuery(SIGN_IN, {
      onCompleted: (data) => {
        console.log("$$$____Login Success_____%%%%");
        const decodeJwt: JwtPayloadType = jwtDecode(data?.signIn?.token);
        //store id to local storage for get user profile from dashboard
        console.log("######", decodeJwt)
        localStorage.setItem('accessToken', data?.signIn?.token);
        localStorage.setItem('userId', decodeJwt?.userId);
        localStorage.setItem('fullName', decodeJwt?.userFullName)
        navigate('/chat')
      },
      onError: (err) => {
        console.log(err.message);
        setSignInError(err.message);
      }
    }
    );
  
    const loginFunctionHandler = (data: any) => {
      loginUser({
        variables: {
          emailId: data.emailid,
          password: data.password
        }
      })
    }
  
  
    return (
      <div className='signup-page-container'>
        <div className='signup-image-banner'></div>
        <div>
          <form action="" target="blank" className="form-control-login" onSubmit={handleSubmit(loginFunctionHandler)}>
            <div>
              <h2>Sign In</h2>
            </div>
            <div className='input-label-container'>
              <input type="text" placeholder='Email' {...register("emailid", { required: true })} />
              {
                errors.emailid && errors.emailid.type === 'required' && (
                  <p className="errorMsg">Email is required.</p>
              )}
            </div>
            <div className='input-label-container'>
              <input type="password" placeholder='Password' {...register("password", { required: true })} />
              {
                errors.password && errors.password.type === 'required' && (
                  <p className="errorMsg">Password is required.</p>
              )}
            </div>
            {signInError && <p className='errorMsg'>{signInError}</p>}
            <div className='form-action-control'>
              <button className='sign-up-button' type='submit'>Log In</button>
              <a href="" className='login-anchor' onClick={registerFunctionHandler}>Register</a>
            </div>
          </form>
        </div>
      </div>
    )
}