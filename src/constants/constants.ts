export const URL = {
  baseUrl: 'https://api.potterdb.com/v1/',
  props: 'characters',
  ammount: '?page[size]=',
  currentPage: '&page[number]=',
  search: '&filter[name_cont_any]=',
};

export const DEFAULT_CURRENT_PAGE = 1;
export const DEFAULT_PAGE = 1;
export const RESOURCES_PER_PAGE = 10;

export const THEMES = ['light', 'dark', 'system'] as const;
export const DEFAULT_THEME = 'system';

export const LOCALSTORAGE_THEME = 'theme';
