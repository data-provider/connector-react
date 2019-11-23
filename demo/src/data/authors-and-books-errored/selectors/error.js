/*
Copyright 2019 Javier Brea
Copyright 2019 XbyOrange

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

import { Selector } from "@data-provider/core";
import { errorBooksCollection } from "../origins/error";
import { authorsAndBooks } from "../../authors-and-books";

// Example of a Selector that tries to fetch data from an errored origin and then it handles the error returning another valid selector
export const authorsAndBooksErrored = new Selector(
  {
    source: errorBooksCollection,
    query: query => query,
    catch: () => {
      // error is catched and a valid selector is returned as result
      return authorsAndBooks;
    }
  },
  booksResults => booksResults,
  []
);
