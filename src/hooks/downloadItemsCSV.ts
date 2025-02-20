import { useSelector } from 'react-redux';
import { favoritsSelectors } from '../store/slice/favoritsSelectors';
import { useToast } from '../components/ToastContext';
import { useCallback, useEffect, useRef } from 'react';

export const useDownloadCSV = () => {
  const favorits = useSelector(favoritsSelectors);
  const prevFavorits = useRef(favorits);
  useEffect(() => {
    if (prevFavorits.current !== favorits) {
      prevFavorits.current = favorits;
    }
  }, [favorits]);

  const { addToast } = useToast();
  const downloadCSV = useCallback(() => {
    if (favorits.length === 0) {
      addToast('Нет файла для загрузки!');
      return;
    }

    const csvRows = [];
    const headers = ['Name', 'Species', 'Gender', 'Wiki URL'];
    csvRows.push(headers.join(','));

    favorits.forEach((item) => {
      const row = [
        `"${item.attributes.name}"`,
        `"${item.attributes.species || 'N/A'}"`,
        `"${item.attributes.gender}"`,
        `"${item.attributes.wiki}"`,
      ];
      csvRows.push(row.join(','));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${favorits.length}_items.csv`;
    a.click();
    URL.revokeObjectURL(url);

    addToast('File successfully downloaded!');
  }, [addToast, favorits]);

  return downloadCSV;
};
