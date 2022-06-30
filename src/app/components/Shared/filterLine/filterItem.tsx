import { Button, Classes, Menu, MenuItem } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";
import { useComponentVisible } from "@utils/OutsideClick";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useFilterLineContext } from "./filterLine.context";

const FilterListOptions = (props) => {
  const { data } = props;

  // console.log('FilterListOptions', props);

  return (
    <div
      onClick={() => {
        props.onSelect(data);
      }}
      className={["item--list--item"]
        .concat(data.isSelected ? "selected" : "")
        .join(" ")}
    >
      <p>{data.label}</p>
    </div>
  );
};

const FilterListItem = (props: any) => {
  const { data } = props;
  const { ref, isComponentVisible, setIsComponentVisible, forceClose } =
    useComponentVisible(false);
  const [, setFilterOption] = useFilterLineContext();

  const onOptionSelect = (key, e) => {
    console.log("onOptionSelect", data.value, key, e);
    setFilterOption({
      type: "UPDATE_FILTER",
      value: { field: data.value, optionKey: key },
    });
  };

  const exampleMenu = (
    <div className="item item--wrap">
      <div className="item--list">
        {data.options.map((option, key) => {
          return (
            <div
              key={key}
              className={["item--list--item", Classes.POPOVER_DISMISS]
                .concat(option.isSelected ? " selected" : "")
                .join(" ")}
              onClick={(e) => {
                onOptionSelect(key, e);
              }}
            >
              {option.label}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div
      className={["item", "item--wrap"]
        .concat([isComponentVisible ? "opened" : ""])
        .join(" ")}
    >
      <Popover2 inheritDarkTheme content={exampleMenu} placement="bottom">
        <div className="item--name"> {data.label} </div>
      </Popover2>
    </div>
  );

  return (
    <div
      onClick={() => {
        setIsComponentVisible(true);
      }}
      ref={ref}
      className={["item", "item--wrap"]
        .concat([isComponentVisible ? "opened" : ""])
        .join(" ")}
    >
      <div className="item--name">
        <p>{data.label}</p>
      </div>
      {isComponentVisible && (
        <div className="item--list">
          {data.options.map((option, key) => {
            return (
              <FilterListOptions
                key={key}
                data={option}
                onSelect={(e) => {
                  onOptionSelect(key, e);
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export { FilterListItem };
