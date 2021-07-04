import React, { ReactElement } from "react";

import './Button.scss';

interface ButtonProps {
  style:  string,
  type: string,
  color: string,
  classnames: string,
  children: ReactElement
}

const Button = (props: ButtonProps | any) => {
  const {style, type, color, classnames} = props;

  const classNames = ['btn', 'btn--simple'].concat(classnames).join(' ');

  return(
    <React.Fragment>
      <button className={classNames}>
        {props.children}
      </button>
    </React.Fragment>
  )

}

export default Button;