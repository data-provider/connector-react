import { LocalStorage } from "@data-provider/browser-storage";

// BOOKS SEARCH FILTERS

export const booksSearchFilters = new LocalStorage("booksFilters");

export const booksSearchByAuthorFilters = new LocalStorage("booksByAuthorFilters");
