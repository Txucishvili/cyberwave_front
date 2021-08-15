/* eslint-disable react/display-name */
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import CustomDropDown from '../select/dropdown';
import { useRootClose } from 'react-overlays';
import './filterLine.scss';
import { FilterLineProvider, useFilterLineContext } from './filterLine.context';
import { useHistory } from "react-router-dom"
import { FilterListItem } from './filterItem';

export type FilterList = {
  [name: string]: {
    title: string,
    value: string,
    options: any[],
    urlAttach?: boolean
  }
}

export interface FilterOptions {
  label: string,
  value: string,
  isSelected: boolean,
}

export interface FilterListArray {
  label?: string,
  value: string,
  options: FilterOptions[],
  urlAttach?: boolean
}

export interface FilterLineProps {
  filterList: FilterListArray[],
  withRoute?: boolean,
  getURI: Function
}

const FilterLine = (props: FilterLineProps) => {
  const { filterList, withRoute, getURI } = props;
  // const Filters = Object.values(filterList);
  const [filterListStore, setFilters] = useFilterLineContext();
  const history = useHistory()

  useEffect(() => {
    console.log('filterList', filterList);
    setFilters({ type: 'SET_FILTERS', value: filterList });
  }, []);

  console.log('[activeFilters]', filterListStore.activeFilters);

  useEffect(() => {
    const params = new URLSearchParams()
    filterListStore.activeFilters.forEach((e) => {
      params.append(e.value, e.options.map(e => e.value).toString())
    })
    if (false) {
      // params.append("name", 'query')
    } else {
      // params.append("name", 'query')
      // params.delete("name")
    }
    history.push({ search: params.toString() })
  }, [filterListStore.activeFilters, history])

  return (
    <div className="component-filter-line">
      <div className="filter-line filter-line--wrap" style={{ position: 'sticky' }}>
        <div className="filters">
          {filterList
            ? filterList.map((e, k) => {
              return <FilterListItem
                key={k}
                data={e}
              />
            })
            : null}
        </div>

      </div>
    </div >
  );
}

const FilterLineProviders = (props) => {
  return (
    <FilterLineProvider>
      <FilterLine {...props} />
    </FilterLineProvider>
  )
}

export default FilterLineProviders;
