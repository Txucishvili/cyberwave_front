import React from "react";
import LoginRegisterButtons from "@components/LoginRegister/LoginRegister";
import _loadComponent from "@utils/Loadable";

export const NoRegistered = {
  name: 'NoRegistered',
  HeaderSide: LoginRegisterButtons
}

const Renderer = (props) => {
  props.getModules({
    name: 'NoRegistered',
    scheme: NoRegistered
  });
  return (
    <div>
      No users RENDERER...
    </div>
  )
}

export default Renderer;