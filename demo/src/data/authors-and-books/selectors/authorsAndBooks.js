/*
Copyright 2019 Javier Brea
Copyright 2019 XbyOrange

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

import { Selector } from "@data-provider/core";
import { booksCollection } from "../../books";
import { authorsCollection, authorsBooksCollection } from "../../authors";

// Example of a Selector with concurrent accesses to different origins and selectors
export const authorsAndBooks = new Selector(
  [
    authorsCollection,
    {
      source: authorsBooksCollection,
      query: () => ({ queryString: { all: true } })
    },
    booksCollection
  ],
  results => {
    const authorsResults = results[0],
      authorsAndBooksResults = results[1],
      booksResults = results[2];

    const result = Object.keys(authorsAndBooksResults).map(authorId => {
      const author = authorsResults.find(currentAuthor => currentAuthor.id === authorId);
      const bookIds = authorsAndBooksResults[authorId];
      const books = [];
      bookIds.forEach(bookId => {
        const book = booksResults.find(currentBook => currentBook.id === bookId);
        if (book) {
          books.push(book);
        }
      });

      return {
        ...author,
        books
      };
    });

    return result;
  },
  []
);
