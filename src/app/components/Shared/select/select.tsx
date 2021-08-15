import React, { useState } from 'react';
import { component } from './select.module.scss';

console.log('component', component);

import Select, { components } from 'react-select';
const controlStyles = {
  borderRadius: '1px solid black',
  padding: '5px',
  background: 'transparent',
  color: 'white',
};

const ControlComponent = props => (
  <div style={controlStyles}>
    {<p onClick={() => {
    }}>Custom Control</p>}
    {/* {props.children} */}
    {/* <components.Control {...props} /> */}
  </div>
);

const colourStyles = {
  control: styles => {
    console.log('[control] styles', styles);

    return {
      display: 'flex'
    }
  },
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = 'red';
    console.log('[option] styles', styles);
    return {
      ...styles,
    }
  },
  input: styles => {
    console.log('[input] styles', styles);

    return {}
  },
  placeholder: styles => {
    console.log('[placeholder] styles', styles);

    return {}
  },
  singleValue: (styles, { data }) => {
    console.log('[singleValue] styles', styles);
    return {};
  },
  menuList: (styles) => {
    return {
      ...styles,
      backgroundColor: 'gray',
      color: 'red'
    }
  },
  menu: (styles, state) => {
    console.log('[menu]', styles, state);
    const { backgroundColor, ...newStyles } = styles;
    return {
      ...newStyles
    }
  }
};

const CustomSelect = (props: any) => {
  const [isMenuOpened, setMenu] = useState(false)
  const { options, isSearchable, name, components, isClearable, defaultValue } = props;
  return (
    <div className="component-select">
      <p
        onClick={() => {
          setMenu(!isMenuOpened)
        }}
      >Names</p>
      <Select
        styles={colourStyles}
        menuIsOpen={isMenuOpened}
        defaultValue={options[0]}
        // isClearable
        components={{ Control: ControlComponent }}
        // isSearchable
        name={'name'}
        options={options}
      />
    </div>
  );
}

export default CustomSelect
