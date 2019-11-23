/*
Copyright 2019 XbyOrange

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Loading from "../loading";
import ErrorComponent from "../error";

export const BooksList = ({ books, baseUrl, Delete }) => {
  const booksList = books.value;
  const booksLoading = books.loading;
  const booksError = books.error;

  const list = () => (
    <ul>
      {booksList.map(book => (
        <li key={book.id}>
          <Link to={`${baseUrl}/${book.id}`}>
            {book.title} ({book.year})
          </Link>{" "}
          <Delete id={book.id} />
        </li>
      ))}
    </ul>
  );

  const loading = () => <Loading />;

  const error = () => <ErrorComponent message={booksError.message} />;

  const content = booksLoading ? loading() : booksError ? error() : list();

  return (
    <div className="component">
      <h3>Books list</h3>
      {content}
    </div>
  );
};

BooksList.propTypes = {
  books: PropTypes.object,
  baseUrl: PropTypes.string,
  Delete: PropTypes.func
};
