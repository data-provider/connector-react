/*
Copyright 2019 Javier Brea
Copyright 2019 XbyOrange

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

import { connect } from "@data-provider/connector-react";

import { booksSearchFilters, booksSearchByAuthorFilters } from "../../../data/books";
import { authorsCollection } from "../../../data/authors";

import { default as BooksSearchComponent } from "../../../components/books-search";
import { default as BooksSearchByAuthorComponent } from "../../../components/books-search-by-author";

export const mapDataSourceToProps = () => ({
  titleFilter: booksSearchFilters.query("title").read,
  yearFilter: booksSearchFilters.query("year").read,
  sortBy: booksSearchFilters.query("sortBy").read,
  updateFilters: booksSearchFilters.update
});

export const BooksSearch = connect(mapDataSourceToProps)(BooksSearchComponent);

export const mapDataSourceToPropsByAuthor = () => ({
  authors: authorsCollection.read,
  authorFilter: booksSearchByAuthorFilters.query("author").read,
  titleFilter: booksSearchByAuthorFilters.query("title").read,
  sortBy: booksSearchByAuthorFilters.query("sortBy").read,
  updateFilters: booksSearchByAuthorFilters.update
});

export const BooksSearchByAuthor = connect(mapDataSourceToPropsByAuthor)(
  BooksSearchByAuthorComponent
);
