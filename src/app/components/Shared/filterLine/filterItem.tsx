
import { useComponentVisible } from '@utils/OutsideClick';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { useFilterLineContext } from './filterLine.context';

const FilterListOptions = (props) => {
  const { data } = props;

  // console.log('FilterListOptions', props);

  return (
    <div
      onClick={() => {
        props.onSelect(data);
      }}
      className={['item--list--item'].concat(data.isSelected ? 'selected' : '').join(' ')}
    >
      <p>{data.label}</p>
    </div>
  )
}


const FilterListItem = (props: any) => {
  const { data } = props;
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible,
    forceClose
  } = useComponentVisible(false);
  const [, setFilterOption] = useFilterLineContext();


  const onOptionSelect = (key, e) => {
    console.log('onOptionSelect', data.value, key, e);
    setFilterOption({ type: 'UPDATE_FILTER', value: { field: data.value, optionKey: key } })
  }

  return (
    <div onClick={() => {
      setIsComponentVisible(true);
    }}
      ref={ref}
      className={['item', 'item--wrap'].concat([isComponentVisible ? 'opened' : '']).join(' ')}
    >
      <div className="item--name"><p>{data.label}</p></div>
      {isComponentVisible &&
        <div className="item--list">
          {
            data.options.map((option, key) => {
              return <FilterListOptions
                key={key}
                data={option}
                onSelect={(e) => {
                  onOptionSelect(key, e)
                }}
              />
            })
          }
        </div>
      }
    </div>
  )
}

export {FilterListItem};