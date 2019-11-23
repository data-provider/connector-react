/*
Copyright 2019 Javier Brea
Copyright 2019 XbyOrange

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

const { Feature } = require("@mocks-server/main");

const { getBooks, getBook, addBook, updateBook, deleteBook } = require("./fixtures/api/books");
const { getAuthors } = require("./fixtures/api/authors");
const { getAuthorBooks } = require("./fixtures/api/author-books");
const { getMobileData, getDesktopData } = require("./fixtures/api/mobile-desktop");

const api = new Feature([
  getBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook,
  getAuthors,
  getAuthorBooks,
  getMobileData,
  getDesktopData
]);

module.exports = {
  api
};
