import React from "react";
import "./index.css";
import { GoogleLogin } from "react-google-login";

export default function({ authSocial, returnError }) {
  const onFailure = error => {
    returnError(error);
  };

  return (
    <div className="googleButton">
      <GoogleLogin
        clientId={
          "819223369500-aupgq5mbr3nemhukfim72qq4kbgrjqta.apps.googleusercontent.com"
        }
        onSuccess={response => authSocial(response)}
        buttonText="Sign in with Google"
        onFailure={onFailure}
      />
    </div>
  );
}
