import React, { useState } from "react";
import FormComponent from "../components/form";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div>
      {isLogin && (
        <FormComponent
          title="login"
          setIsLogin={setIsLogin}
          isLogin={isLogin}
        />
      )}
      {!isLogin && (
        <FormComponent
          title="register"
          setIsLogin={setIsLogin}
          isLogin={isLogin}
        />
      )}
    </div>
  );
};

export default Auth;
