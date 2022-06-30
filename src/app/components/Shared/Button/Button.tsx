import React, { ReactElement } from "react";

import './Button.scss';

interface ButtonProps {
  style?:  string,
  type?: string,
  color?: string,
  classnames?: string,
  children?: ReactElement,
  none?: boolean | undefined
}

const Button = (props: ButtonProps | any) => {
  var {style, type, color, classnames, none, simple} = props;

  simple = simple ? simple : false;

  const classNames = ['btn', !!none ? 'btn--none' : 'btn--simple'].concat(classnames).join(' ');

  return(
    <React.Fragment>
      <button {...props} className={classNames}>
        {props.children}
      </button>
    </React.Fragment>
  )

}

export default Button;