import React from 'react';
import { ResponseType } from '../api/getItems';
import ListItems from './ListItems';
import Paginator from './Paginator';
import {
  RESOURCES_PER_PAGE,
  // DEFAULT_CURRENT_PAGE,
} from '../constants/constants';
// import { useAppSelector } from '../hooks/redux';
import { queryParamsSelectors } from '../store/slice/queryParamsSelectors';
import { useSelector } from 'react-redux';

type MainPropsType = {
  items: ResponseType[];
  count: number;
  onPageChanged: (page: number) => void;
};

const Main: React.FC<MainPropsType> = ({ items, count, onPageChanged }) => {
  // const [currentPage, setCurrentPage] = useState<number>(DEFAULT_CURRENT_PAGE);
  // console.log('count main', count);
  const { page } = useSelector(queryParamsSelectors);
  return (
    <main>
      <Paginator
        currentPage={Number(page)}
        // setCurrentPage={setCurrentPage}
        totalItemsCount={count}
        pageSize={RESOURCES_PER_PAGE}
        onPageChanged={onPageChanged}
      />
      <ListItems items={items} />
    </main>
  );
};

export default Main;
