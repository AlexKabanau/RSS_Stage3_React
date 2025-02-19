import { useSelector } from 'react-redux';
import { favoritsSelectors } from '../store/slice/favoritsSelectors';
import { charactersSelectors } from '../store/slice/chractersSelectors';
import { useToast } from '../components/ToastContext';
import { useCallback } from 'react';
// import { toast } from 'sonner';

export const useDownloadCSV = () => {
  const favorits = useSelector(favoritsSelectors);
  const { response } = useSelector(charactersSelectors);

  const { addToast } = useToast();
  const downloadCSV = useCallback(() => {
    console.log('Клик для загрузки');

    if (favorits.length === 0) {
      addToast('Нет файла для загрузки!');
      return;
    }

    // Логируем favorits и response data
    console.log('Избранное:', favorits);
    console.log('Ответные данные:', response.data);

    // Преобразуем данные в CSV-формат
    const csvRows = [];
    const headers = ['Name', 'Species', 'Gender', 'Wiki URL'];
    csvRows.push(headers.join(','));

    // Фильтруем данные по избранным ID
    const filteredObjects = response.data.filter((obj) =>
      favorits.includes(obj.id)
    );

    // Логируем отфильтрованные объекты
    console.log('Количество отфильтрованных объектов:', filteredObjects.length);
    console.log('Отфильтрованные объекты:', filteredObjects);

    filteredObjects.forEach((item) => {
      const row = [
        `"${item.attributes.name}"`,
        `"${item.attributes.species || 'N/A'}"`,
        `"${item.attributes.gender}"`,
        `"${item.attributes.wiki}"`,
      ];
      csvRows.push(row.join(','));
    });

    // Создаем CSV-файл
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
  }, [addToast, favorits, response.data]);

  return downloadCSV;
};
