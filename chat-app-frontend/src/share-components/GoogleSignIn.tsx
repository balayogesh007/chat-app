import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { CLIENT_ID } from "../config/config";
import { useNavigate } from "react-router-dom";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { CHECK_USER, CREATE_USER } from "../queries/users.query";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export const GoogleSignIn = () => {
  const navigate = useNavigate();
  const [checkUser, setCheckUser] = useState<Boolean>(false);
  const [gResp, setGResp] = useState<any>();
  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      localStorage.setItem("userId", data?.createUser?.uId);
      localStorage.setItem(
        "fullName",
        `${data?.createUser?.firstName} ${data?.createUser?.lastName}`
      );
      navigate("/chat");
    },
    onError: () => {
      alert("Failed to Sign In.");
    },
  });

  const [checkUserExists] = useMutation(CHECK_USER, {
    onCompleted: (data) => {
      console.log("User Exixts", data);
      setCheckUser(data?.checkUserExist);
      const decodeJwt: any = jwtDecode(gResp?.credential);
      if (!data?.checkUserExist) {
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
      }else{
        localStorage.setItem(
          "fullName",
          `${decodeJwt?.given_name} ${decodeJwt?.family_name}`
        );
        navigate("/chat");
      }
    },
    onError: () => {
      console.log("Faile to get user check.");
    },
  });

  const onSuccessResponse = (resp: any) => {
    setGResp(resp);
    localStorage.setItem("accessToken", resp?.credential);
    const decodeJwt: any = jwtDecode(resp?.credential);
    checkUserExists({
      variables: {
        emailId: decodeJwt?.email,
      },
    });
  };

  useEffect(() => {
    // onSuccessResponse(gResp);
    console.log("gResp------",gResp);
    
  },[checkUser, gResp])


  return (
    <>
      {CLIENT_ID && (
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <GoogleLogin
            onSuccess={onSuccessResponse}
            onError={() => {
              alert("Login With Google Failed");
              console.log("Login With Google Failed");
            }}
          />
        </GoogleOAuthProvider>
      )}
    </>
  );
};
