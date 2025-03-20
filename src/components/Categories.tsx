import { memo, useCallback, useEffect, useRef, useState } from 'react';
// import { useSelector } from 'react-redux';
import {
  FilterItem,
  FilterPropertyEnum,
  // selectFilter,
  setFilter,
} from '../redux/slices/filterSlice';
import { useAppDispatch } from '../redux/store';

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
const Categories = memo(function Categories({ value }: { value: FilterItem }) {
  const dispatch = useAppDispatch();

  const filterRef = useRef<HTMLDivElement>(null);
  const [openFilter, setOpenFilter] = useState(false);
  // const { categoryId } = useSelector(selectFilter);
  const onClickFilterListItem = useCallback(
    (obj: FilterItem) => {
      dispatch(setFilter(obj));
      setOpenFilter(false);
    },
    [dispatch]
  );

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setOpenFilter(false);
      }
    };
    //FIXME document
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
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
        <b>Region:</b>
        <span onClick={() => setOpenFilter(!openFilter)}>{value.name}</span>
      </div>
      {openFilter && (
        <div className="categories__popup">
          <ul>
            {filterList.map((obj, index) => (
              <li
                key={index}
                onClick={() => onClickFilterListItem(obj)}
                className={value.name === obj.name ? 'active' : ''} // Add active class
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
  );
});

export default Categories;
