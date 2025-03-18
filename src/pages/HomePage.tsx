import React, { useEffect, useRef, useState } from 'react';
import CountryBlock from '../components/CountryBlock';
import Search from '../components/Search';
import { selectSort, setSort } from '../redux/slices/filterSlice';
import { useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';

type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};
type FilterItem = {
  name: string;
  filterProperty: FilterPropertyEnum;
};

export enum SortPropertyEnum {
  POPULATION_DESC = 'population',
  POPULATION_ASC = '-population',
  NAME_DESC = 'name',
  NAME_ASC = '-name',
}
export enum FilterPropertyEnum {
  ALL = 'All',
  ANTARCTIC = 'Antarctic',
  AMERICAS = 'Americas',
  EUROPE = 'Europe',
  AFRICA = 'Africa',
  ASIA = 'Asia',
  OCEANIA = 'Oceania',
}

function HomePage() {
  const dispatch = useAppDispatch();

  // const { categoryId, sort, currentPage, searchValue } = useAppSelector(selectFilter);
  // const onChangeCategory = (categoryId: number) => {
  //   console.log(categoryId);
  //   // dispatch(setCategoryId(categoryId));
  // };
  //TODO dropdown
  // const categories = [
  //   'All',
  //   'Antarctic',
  //   'Americas',
  //   'Europe',
  //   'Africa',
  //   'Asia',
  //   'Oceania',
  // ];

  //NEW CAT FILTER
  const filterRef = useRef<HTMLDivElement>(null);
  const [openFilter, setOpenFilter] = useState(false);
  // const sort = useAppSelector(selectSort);
  const filterList: FilterItem[] = [
    {
      name: 'All',
      filterProperty: FilterPropertyEnum.ALL,
    },
    {
      name: 'Antarctic',
      filterProperty: FilterPropertyEnum.ANTARCTIC,
    },
    {
      name: 'Americas',
      filterProperty: FilterPropertyEnum.AMERICAS,
    },
    {
      name: 'Europe',
      filterProperty: FilterPropertyEnum.EUROPE,
    },
    {
      name: 'Africa',
      filterProperty: FilterPropertyEnum.AFRICA,
    },
    {
      name: 'Asia',
      filterProperty: FilterPropertyEnum.ASIA,
    },
    {
      name: 'Oceania',
      filterProperty: FilterPropertyEnum.OCEANIA,
    },
  ];

  const onClickFilterListItem = (obj: FilterItem) => {
    // dispatch(setSort(obj));
    setOpenFilter(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (
        filterRef.current &&
        !event.composedPath().includes(filterRef.current)
      ) {
        setOpenFilter(false);
      }
    };
    //FIXME document
    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  //SORT

  const sortRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const sort = useSelector(selectSort);
  const sortList: SortItem[] = [
    {
      name: 'population (DESC)',
      sortProperty: SortPropertyEnum.POPULATION_DESC,
    },
    { name: 'population (ASC)', sortProperty: SortPropertyEnum.POPULATION_ASC },
    { name: 'name (DESC)', sortProperty: SortPropertyEnum.NAME_DESC },
    { name: 'name (ASC)', sortProperty: SortPropertyEnum.NAME_ASC },
  ];

  const onClickListItem = (obj: SortItem) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };
    //FIXME document
    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  //NEW SORT

  ///DATA
  // const { items, status } = useAppSelector(selectPizzasData);

  // const data = items
  //   // .filter((obj) => (obj.title.toLowerCase().includes(searchValue.toLowerCase())))
  //   .map((obj) => (
  //       <CountryBlock key={obj.id} rating={''} {...obj} />
  //   ));

  return (
    <div>
      <div className="content__top">
        {/* <div className="categories">
          <ul>
            {categories.map((categoryName, index) => (
              <li
                key={index}
                onClick={() => onChangeCategory(index)}
                // className={value === index ? 'active' : ''}
                className={'active'}
              >
                {categoryName}
              </li>
            ))}
          </ul>
        </div> */}
        {/* NEW FILTER */}
        <div ref={filterRef} className="categories">
          <div className="categories__label">
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                fill="#2C2C2C"
              />
            </svg>
            <b>Filter:</b>
            <span onClick={() => setOpenFilter(!openFilter)}>
              Filter prop{/* {sort.name} */}
            </span>
          </div>
          {openFilter && (
            <div className="filter__popup">
              <ul>
                {filterList.map((obj, index) => (
                  <li
                    key={index}
                    onClick={() => onClickFilterListItem(obj)}
                    // className={
                    //   sort.sortProperty === obj.sortProperty ? 'active' : ''
                    // }
                  >
                    {obj.name}
                  </li>
                ))}
                {/* <li className="active">популярности</li>
                <li>цене</li>
                <li>алфавиту</li> */}
              </ul>
            </div>
          )}
        </div>
        {/* SEARCH */}
        <Search />
        {/* SORT */}
        <div ref={sortRef} className="sort">
          <div className="sort__label">
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                fill="#2C2C2C"
              />
            </svg>
            <b>Sort by:</b>
            <span onClick={() => setOpen(!open)}>{sort.name}</span>
          </div>
          {open && (
            <div className="sort__popup">
              <ul>
                {sortList.map((obj, index) => (
                  <li
                    key={index}
                    onClick={() => onClickListItem(obj)}
                    // className={
                    //   sort.sortProperty === obj.sortProperty ? 'active' : ''
                    // }
                  >
                    {obj.name}
                  </li>
                ))}
                {/* <li className="active">популярности</li>
                <li>цене</li>
                <li>алфавиту</li> */}
              </ul>
            </div>
          )}
        </div>
      </div>
      <h2 className="content__title">Countries</h2>
      <div className="content__items">{/* {data} */}</div>
    </div>
  );
}

export default HomePage;
