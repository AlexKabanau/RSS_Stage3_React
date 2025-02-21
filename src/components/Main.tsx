import React from 'react';
import { ResponseType } from '../api/getItems';
import ListItems from './ListItems';
import Paginator from './Paginator';
import { RESOURCES_PER_PAGE } from '../constants/constants';
import { queryParamsSelectors } from '../store/slice/queryParamsSelectors';
import { useSelector } from 'react-redux';

type MainPropsType = {
  items: ResponseType[];
  count: number;
  onPageChanged: (page: number) => void;
  className?: string;
};

const Main: React.FC<MainPropsType> = ({
  items,
  count,
  onPageChanged,
  className,
}) => {
  const { page } = useSelector(queryParamsSelectors);
  return (
    <main className={className}>
      <Paginator
        currentPage={Number(page)}
        totalItemsCount={count}
        pageSize={RESOURCES_PER_PAGE}
        onPageChanged={onPageChanged}
      />
      <ListItems items={items} />
    </main>
  );
};

export default Main;
