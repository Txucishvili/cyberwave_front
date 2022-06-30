import React, { createContext, useContext, useReducer } from "react";

interface FilterLineContext {
  filterOptions: any[];
  activeFilters: any[];
}

const initialState = {
  filterOptions: [],
  activeFilters: [],
} as FilterLineContext;

const FilterLineContext = createContext<[FilterLineContext, any]>([initialState, () => { }]);
const useFilterLineContext = () => useContext(FilterLineContext);

function filterReducer(state, action) {
  const { type, value } = action;
  let obj: FilterLineContext = {...state};

  switch (type) {
    case 'SET_FILTERS':
      Object.assign(obj, state, { filterOptions: value });
      break;
    case 'UPDATE_FILTER':
      const { field, optionKey } = value;
      const fieldEl = obj.filterOptions.find(e => e.value === field);
      fieldEl.options[optionKey].isSelected = !fieldEl.options[optionKey].isSelected;
      break;
    default:
      break;
  }

  // TODO: !! better filtering....

  const activeFilters = obj.filterOptions.reduce((acc: any[], e, key, list) => {

    if (e.options.filter((o) => o.isSelected).length) {
      const options = e.options.filter((o) => o.isSelected);
      const { label, ...filterEl } = e;
      acc.push({
        ...filterEl,
        options
      });
    }

    return acc;
  }, []);

  return Object.assign(obj, {activeFilters});
}



const FilterLineProvider = (props) => {
  const [filterOptions, setOptions]: [FilterLineContext, any] = React.useReducer(filterReducer, initialState)

  return (
    <FilterLineContext.Provider value={[filterOptions, setOptions]}>
      {props.children}
    </FilterLineContext.Provider>
  )
};

export { FilterLineProvider, useFilterLineContext, FilterLineContext }