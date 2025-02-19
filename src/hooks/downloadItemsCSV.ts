import { useSelector } from 'react-redux';
import { favoritsSelectors } from '../store/slice/favoritsSelectors';
import { useToast } from '../components/ToastContext';
import { useCallback, useEffect, useRef } from 'react';
import { ResponseInfoType } from '../api/getItems';

export const useDownloadCSV = () => {
  const favorits = useSelector(favoritsSelectors);
  console.log('favorits: ', favorits);
  const prevFavorits = useRef(favorits);
  useEffect(() => {
    if (prevFavorits.current !== favorits) {
      console.log('favorits changed:', favorits);
      prevFavorits.current = favorits;
    }
  }, [favorits]);

  const { addToast } = useToast();
  const downloadCSV = useCallback(() => {
    console.log('Клик для загрузки');

    if (favorits.length === 0) {
      addToast('Нет файла для загрузки!');
      return;
    }

    console.log('Избранное:', favorits);
    // console.log('Ответные данные:', response?.data);

    const csvRows = [];
    const headers = ['Name', 'Species', 'Gender', 'Wiki URL'];
    csvRows.push(headers.join(','));

    // const filteredObjects = response?.data.filter(
    //   (obj) => favorits.includes(String(obj.id)) // Приводим id к строке
    // );

    // console.log(
    //   'Количество отфильтрованных объектов:',
    //   filteredObjects?.length
    // );
    // console.log('Отфильтрованные объекты:', filteredObjects);

    favorits.forEach((item) => {
      const row = [
        `"${item.attributes.name}"`,
        `"${item.attributes.species || 'N/A'}"`,
        `"${item.attributes.gender}"`,
        `"${item.attributes.wiki}"`,
      ];
      console.log('Добавляемая строка:', row.join(','));
      csvRows.push(row.join(','));
    });

    console.log('csvRows перед созданием файла:', csvRows);

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${favorits.length}_items.csv`;
    debugger;
    a.click();
    URL.revokeObjectURL(url);

    addToast('Файл успешно скачан!');
  }, [addToast, favorits]);

  return downloadCSV;
};
