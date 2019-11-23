/*
Copyright 2019 Javier Brea
Copyright 2019 XbyOrange

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

import { connect } from "@data-provider/connector-react";

import {
  booksCollection,
  booksFilteredAndSorted,
  authorsAndBooksFilteredAndSorted
} from "../../../data/books";

import { default as BooksListComponent } from "../../../components/books-list";

export const mapDataSourceToProps = () => ({
  books: booksCollection.read
});

export const BooksList = connect(mapDataSourceToProps)(BooksListComponent);

export const mapDataSourceToPropsFiltered = props => ({
  books: booksFilteredAndSorted
    .titleContaining(props.titleFilter)
    .year(props.yearFilter)
    .sortBy(props.sortBy).read
});

export const BooksListFiltered = connect(mapDataSourceToPropsFiltered)(BooksListComponent);

export const mapDataSourceToPropsFilteredByAuthor = props => ({
  books: authorsAndBooksFilteredAndSorted
    .author(props.authorFilter)
    .titleContaining(props.titleFilter)
    .sortBy(props.sortBy).read
});

export const BooksListFilteredByAuthor = connect(mapDataSourceToPropsFilteredByAuthor)(
  BooksListComponent
);
