import { useEffect } from 'react';
import Header from '../../components/Header';
import reactLogo from '../../assets/react.svg';
import Main from '../../components/Main';
import ErrorButton from '../../components/ErrorButton';
import Footer from '../../components/Footer';
import { Outlet, useSearchParams } from 'react-router';
import { DEFAULT_PAGE } from '../../constants/constants';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useTheme } from '../../hooks/useTheme';
import { setSearchParamsToState } from '../../store/slice/serchParamsSlice';
import {
  setPage,
  setQueryParamsToState,
} from '../../store/slice/queryParamsSlice';
import { useAppDispatch } from '../../store/store';
import { fetchItems } from '../../store/slice/chractersSlice';
import { useSelector } from 'react-redux';
import { charactersSelectors } from '../../store/slice/chractersSelectors';
import { queryParamsSelectors } from '../../store/slice/queryParamsSelectors';
import { characterSelectors } from '../../store/slice/chracterSelectors';
import { favoritsSelectors } from '../../store/slice/favoritsSelectors';
import { ArrowDownToLine, Trash2 } from 'lucide-react';
import { clearFavorits } from '../../store/slice/favoritsSlice';
// import { toast } from 'sonner';
import { useDownloadCSV } from '../../hooks/downloadItemsCSV';
// import ToastContainer from '../../components/ToastContainer';
import { useToast } from '../../components/ToastContext';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { addToast } = useToast();

  const { response, status } = useSelector(charactersSelectors);
  const { response: characterResponse } = useSelector(characterSelectors);
  const { page, search } = useSelector(queryParamsSelectors);
  const [inputValue, setInputValue] = useLocalStorage();
  const [searchParams, setSearchParams] = useSearchParams();
  const { theme } = useTheme();
  const favorits = useSelector(favoritsSelectors);
  const downloadCSV = useDownloadCSV();

  useEffect(() => {
    dispatch(fetchItems({ searchParams: search, page: Number(page) }));
  }, [search, page, dispatch]);

  const handleOnSubmit = () => {
    setInputValue(inputValue);
    dispatch(setSearchParamsToState(inputValue));
    dispatch(
      setQueryParamsToState({
        search: inputValue,
        page: DEFAULT_PAGE.toString(),
      })
    );

    setSearchParams({ search: inputValue, page: DEFAULT_PAGE.toString() });
    console.log(inputValue);
  };

  const onPageChanged = (page: number) => {
    dispatch(setPage(page.toString()));
    dispatch(setSearchParamsToState(inputValue));

    const currentSearch = searchParams.get('search') || inputValue;
    setSearchParams({ search: currentSearch, page: page.toString() });
  };
  const onDeleteIconClick = () => {
    console.log('delete click');
    dispatch(clearFavorits());
    addToast('Successfully deleted all characters!');
  };
  const onDownloadIconClick = () => {
    console.log('download click');
    downloadCSV();

    // if (favorits.length === 0) {
    //   alert('Нет выбранных элементов для скачивания!');
    //   return;
    // }

    // // Преобразуем данные в CSV-формат
    // const csvRows = [];
    // const headers = ['Name', 'Species', 'Gender', 'Wiki URL']; // Заголовки CSV
    // csvRows.push(headers.join(',')); // Добавляем заголовки
    // //TODO найти итемсы по ID
    // const filteredObjects = response.data.filter((obj) =>
    //   favorits.includes(obj.id)
    // );
    // filteredObjects.forEach((item) => {
    //   const row = [
    //     `"${item.attributes.name}"`, // Оборачиваем в кавычки на случай, если есть запятые
    //     `"${item.attributes.species || 'N/A'}"`,
    //     `"${item.attributes.gender}"`,
    //     `"${item.attributes.wiki}"`,
    //   ];
    //   csvRows.push(row.join(','));
    // });

    // // Создаем CSV-файл
    // const csvString = csvRows.join('\n');
    // const blob = new Blob([csvString], { type: 'text/csv' });

    // // Создаем объект URL для Blob
    // const url = URL.createObjectURL(blob);

    // // Создаем элемент <a> для скачивания
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = `${favorits.length}_items.csv`; // Задаем имя файла

    // // Программно кликаем по ссылке
    // // document.body.appendChild(a);
    // a.click();
    // URL.revokeObjectURL(url);
    // toast.success('Successfully downloaded!');
  };

  return (
    <div className={theme === 'dark' ? 'app dark' : 'app'} role="mainPage">
      <Header
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleOnSubmit={handleOnSubmit}
      />
      {status === 'loading' && (
        <div>
          <p>Loading...</p>
          <img src={reactLogo} className="logo" alt="loading" />
        </div>
      )}
      {status === 'error' && <div>Some error occurred. Please try again.</div>}
      {status === 'success' && response.data?.length === 0 && (
        <div>Items not found</div>
      )}
      {favorits.length > 0 && (
        <>
          <p className="favorits">
            Favorits: {favorits.length}
            <Trash2 size={15} cursor={'pointer'} onClick={onDeleteIconClick} />
            <ArrowDownToLine
              size={15}
              cursor={'pointer'}
              onClick={onDownloadIconClick}
            />
          </p>
        </>
      )}
      {response.data && (
        <div role="homePage" className="main-container">
          <Main
            // style={{ width: characterResponse ? 'calc(2/3 * 100%)' : '100%' }}
            className={characterResponse ? 'fullWidth' : 'width2_3'}
            items={response.data}
            count={response.meta.pagination?.records || 0}
            onPageChanged={onPageChanged}
          />
          {/* {characterResponse ? 'есть' : 'нет'} */}
          <Outlet />
        </div>
      )}
      <div className="error-container">
        <ErrorButton />
      </div>
      <Footer />
    </div>
  );
}
