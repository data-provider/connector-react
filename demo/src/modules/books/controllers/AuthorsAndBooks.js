/*
Copyright 2019 Javier Brea
Copyright 2019 XbyOrange

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

import { connect } from "@data-provider/connector-react";

import { authorsAndBooks } from "../../../data/authors-and-books";
import { authorsAndBooksErrored } from "../../../data/authors-and-books-errored";

import { default as AuthorsAndBooksComponent } from "../../../components/authors-and-books-list";

export const mapDataSourceToProps = () => ({
  authorAndBooks: authorsAndBooks.read
});

export const AuthorsAndBooks = connect(mapDataSourceToProps)(AuthorsAndBooksComponent);

export const mapDataSourceToPropsErrored = () => ({
  authorAndBooks: authorsAndBooksErrored.read
});

export const AuthorsAndBooksErrorManagement = connect(mapDataSourceToPropsErrored)(
  AuthorsAndBooksComponent
);
