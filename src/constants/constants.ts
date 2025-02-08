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

// https://api.potterdb.com/v1/characters?page[size]=10?page[number]=1?filter[name_cont_any]=Weasley

// https://api.potterdb.com//v1//spells?page[size]=8&page[number]=1&filter[name_cont_any]=an
// https://api.potterdb.com//v1//characters?page[size]=8&page[number]=1&filter[name_cont_any]=Weasley
