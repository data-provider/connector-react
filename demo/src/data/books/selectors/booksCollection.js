/*
Copyright 2019 Javier Brea
Copyright 2019 XbyOrange

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

import { sortBy } from "lodash";
import { Selector } from "@data-provider/core";
import { booksCollection, titleContainingFilter } from "../origins/booksCollection";
import { authorsBooksCollection } from "../../authors";

// SELECTORS

export const booksFiltered = new Selector(
  {
    source: booksCollection,
    query: titleContainingFilter
  },
  booksResults => booksResults,
  []
);

// Example of a Selector with a filter being sent to the server, another filter resolved locally by client and sortering locally
export const booksFilteredAndSorted = new Selector(
  {
    source: booksFiltered,
    query: query => query && query.titleContaining
  },
  (booksResults, filter) => {
    const { year } = filter;
    let booksResultsFiltered = booksResults;

    // year query property is not sent to server, the books results are filtered by client
    if (year) {
      booksResultsFiltered = booksResultsFiltered.filter(book => {
        return book.year.startsWith(year);
      });
    }

    return sortBy(booksResultsFiltered, (filter && filter.sortBy) || "id");
  },
  []
);

// Custom filters are optional, but improve the interface
booksFilteredAndSorted.addCustomQuery({
  sortBy: sortedBy => ({ sortBy: sortedBy })
});

booksFilteredAndSorted.addCustomQuery({
  titleContaining: titleContaining => ({ titleContaining }),
  year: year => ({ year })
});

// Example of a Selector with nested queries, every level depends on previous origin data
export const authorsAndBooksFilteredAndSorted = new Selector(
  {
    source: authorsBooksCollection,
    query: query => {
      if (query && query.author) {
        return {
          queryString: {
            authorId: query.author
          }
        };
      }
    }
  },
  {
    source: booksCollection,
    query: (query, previousResults) => {
      if (previousResults && previousResults.length > 0) {
        return {
          queryString: {
            bookIds: previousResults
          }
        };
      }
    }
  },
  (query, booksResults, filter) => {
    const { titleContaining } = filter;
    let booksResultsFiltered = booksResults;

    // title query property is not sent to server, the books results are filtered by client
    if (titleContaining) {
      booksResultsFiltered = booksResultsFiltered.filter(book => {
        return book.title.toLowerCase().includes(titleContaining.toLowerCase());
      });
    }

    return sortBy(booksResultsFiltered, (filter && filter.sortBy) || "id");
  },
  []
);

// Custom filters are optional, but improve the interface
authorsAndBooksFilteredAndSorted.addCustomQuery({
  sortBy: sortedBy => ({ sortedBy })
});

authorsAndBooksFilteredAndSorted.addCustomQuery({
  author: author => ({ author }),
  titleContaining: titleContaining => ({ titleContaining })
});
