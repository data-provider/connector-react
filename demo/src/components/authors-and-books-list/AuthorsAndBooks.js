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

export class AuthorsAndBooks extends React.Component {
  list(authorAndBooks) {
    return (
      <ul>
        {authorAndBooks.map(author => (
          <li key={author.id}>
            {author.name}
            <ul>
              {author.books.map(book => (
                <li key={book.id}>
                  {book.title} ({book.year})
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const { loading, error, value } = this.props.authorAndBooks;
    return (
      <div className="component">
        <h3>Authors and Books list</h3>
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorComponent message={error.message} />
        ) : (
          this.list(value)
        )}
      </div>
    );
  }
}

AuthorsAndBooks.defaultProps = {
  authorAndBooks: {}
};

AuthorsAndBooks.propTypes = {
  authorAndBooks: PropTypes.object
};
