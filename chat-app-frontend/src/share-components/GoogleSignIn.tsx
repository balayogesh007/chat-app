import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { CLIENT_ID } from '../config/config';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../queries/users.query';
import { jwtDecode } from 'jwt-decode';

export const GoogleSignIn = () => {
  const navigate = useNavigate();
  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      localStorage.setItem('userId', data?.createUser?.uId);
      localStorage.setItem(
        'fullName',
        `${data?.createUser?.firstName} ${data?.createUser?.lastName}`
      );
      navigate('/chat');
    },
    onError: () => {
      alert('Failed to Sign In.');
    },
  });

  const onSuccessResponse = (resp: any) => {
    localStorage.setItem('accessToken', resp?.credential);
    const decodeJwt: any = jwtDecode(resp?.credential);
    createUser({
      variables: {
        createUserInput: {
          firstName: decodeJwt?.given_name,
          lastName: decodeJwt?.family_name,
          emailId: decodeJwt?.email,
          isSocialLogin: true,
        },
      },
    });
  };

  return (
    <>
      {CLIENT_ID && (
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <GoogleLogin
            onSuccess={onSuccessResponse}
            onError={() => {
              alert('Login With Google Failed');
              console.log('Login With Google Failed');
            }}
          />
        </GoogleOAuthProvider>
      )}
    </>
  );
};
