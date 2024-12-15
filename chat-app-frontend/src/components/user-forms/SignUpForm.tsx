import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CREATE_USER } from '../../queries/users.query';
import './SignUpForm.css';
import { GoogleSignIn } from '../../share-components/GoogleSignIn';
import ReactFacebookLogin from 'react-facebook-login';

export const SignUpFormComponent = () => {
  const navigate = useNavigate();
  const loginFunctionHandler = () => {
    navigate('/');
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      navigate('/');
    },
    onError: () => {
      alert('Failed to Sign Up.');
    },
  });

  const formSubmitHandler = (data: any) => {
    console.log('Data', data);
    createUser({
      variables: {
        createUserInput: {
          firstName: data.firstname,
          lastName: data.lastname,
          emailId: data.emailid,
          password: data.password,
        },
      },
    });
  };

  return (
    <div className="signup-page-container">
      <div className="signup-image-banner"></div>
      <div>
        <form
          action=""
          target="blank"
          className="form-control"
          onSubmit={handleSubmit(formSubmitHandler)}
        >
          <div>
            <h2>Register</h2>
          </div>
          <div className="input-label-container">
            {/* <input type="text" placeholder='First Name'/> */}
            <input
              type="text"
              placeholder="First Name"
              {...register('firstname', { required: true })}
            />
            {errors.firstname && errors.firstname.type === 'required' && (
              <p className="errorMsg">First Name is required.</p>
            )}
          </div>
          <div className="input-label-container">
            {/* <input type="text" placeholder='Last Name'/> */}
            <input
              type="text"
              placeholder="Last Name"
              {...register('lastname', { required: true })}
            />
            {errors.lastname && errors.lastname.type === 'required' && (
              <p className="errorMsg">Last Name is required.</p>
            )}
          </div>
          <div className="input-label-container">
            {/* <input type="text" placeholder='Email Id'/> */}
            <input
              type="text"
              placeholder="Email"
              {...register('emailid', {
                required: true,
                pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              })}
            />
            {errors.emailid && errors.emailid.type === 'required' && (
              <p className="errorMsg">Email is required.</p>
            )}
            {errors.emailid && errors.emailid.type === 'pattern' && (
              <p className="errorMsg">Email is not valid.</p>
            )}
          </div>
          <div className="input-label-container">
            {/* <input type="password" placeholder='Password'/> */}
            <input
              type="password"
              placeholder="Password"
              {...register('password', {
                required: true,
                minLength: 8,
                validate: {
                  checkLength: (value) => value.length >= 6,
                  matchPattern: (value) =>
                    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                      value
                    ),
                },
              })}
            />
            {errors.password && errors.password.type === 'required' && (
              <p className="errorMsg">Password is required.</p>
            )}
            {errors.password && errors.password.type === 'minLength' && (
              <p className="errorMsg">Password should be min 8 characters</p>
            )}
            {errors.password?.type === 'matchPattern' && (
              <p className="errorMsg">
                Password should contain at least one uppercase letter, lowercase
                letter, digit, and special symbol.
              </p>
            )}
          </div>
          <div className="form-action-control">
            <div>
              <button className="sign-up-button" type="submit">
                Submit
              </button>
            </div>
            <div>
              <a
                href=""
                className="register-anchor"
                onClick={loginFunctionHandler}
              >
                Log In
              </a>
            </div>
            <div>
              <GoogleSignIn />
            </div>
            <div></div>
          </div>
        </form>
      </div>
    </div>
  );
};
