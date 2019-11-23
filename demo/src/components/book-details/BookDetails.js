/*
Copyright 2019 XbyOrange

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

import React from "react";
import PropTypes from "prop-types";

import Loading from "../loading";
import ErrorComponent from "../error";

export const BookDetails = ({ book }) => {
  const bookDetails = book.value || [];
  const bookLoading = book.loading;
  const bookError = book.error;

  const details = () => (
    <ul>
      <li> Id: {bookDetails.id}</li>
      <li> Title: {bookDetails.title}</li>
      <li> Year: {bookDetails.year}</li>
    </ul>
  );

  const loading = () => <Loading />;

  const error = () => <ErrorComponent message={bookError.message} />;

  const content = bookLoading ? loading() : bookError ? error() : details();

  return (
    <div className="component">
      <h3>Book details</h3>
      {content}
    </div>
  );
};

BookDetails.propTypes = {
  book: PropTypes.any
};
