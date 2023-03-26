import React from "react";

import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";

const LogIn = () => {
  const clientId = "";
  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={(res) => {
            console.log(res);
          }}
        />
      </GoogleOAuthProvider>
    </>
  );
};

export default LogIn;
