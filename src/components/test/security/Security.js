import React from "react";
import Login from "./Login";
import RefreshToken from "./RefreshToken";
import Logout from "./Logout";
import ChangePassword from "./ChangePassword";
import VerifyPassword from "./VerifyPassword";
import CheckPermission from "./CheckPermission";

const Security = () => {
  return (
    <div>
      <Login />
      <RefreshToken />
      <Logout />
      <ChangePassword />
      <VerifyPassword />
      <CheckPermission />
    </div>
  );
};

export default Security;
