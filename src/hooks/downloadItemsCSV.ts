import { useSelector } from 'react-redux';
import { favoritsSelectors } from '../store/slice/favoritsSelectors';
import { charactersSelectors } from '../store/slice/chractersSelectors';
import { toast } from 'sonner';

export const useDownloadCSV = () => {
  const favorits = useSelector(favoritsSelectors);
  const { response } = useSelector(charactersSelectors);

  const downloadCSV = () => {
    console.log('download click');

    if (favorits.length === 0) {
      toast.error('Нет выбранных элементов для скачивания!');
      return;
    }

    // Преобразуем данные в CSV-формат
    const csvRows = [];
    const headers = ['Name', 'Species', 'Gender', 'Wiki URL']; // Заголовки CSV
    csvRows.push(headers.join(',')); // Добавляем заголовки

    // Фильтруем данные по избранным ID
    const filteredObjects = response.data.filter((obj) =>
      favorits.includes(obj.id)
    );

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

    // Создаем ссылку для скачивания
    const a = document.createElement('a');
    a.href = url;
    a.download = `${favorits.length}_items.csv`;

    // Запускаем скачивание
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Файл успешно скачан!');
  };

  return downloadCSV;
};
