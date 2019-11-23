/*
Copyright 2019 Javier Brea
Copyright 2019 XbyOrange

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

import { connect } from "@data-provider/connector-react";

import { booksModels } from "../../../data/books";

import { default as DeleteBookComponent } from "../../../components/delete-book";

export const mapDataSourceToProps = ({ id }) => {
  const dataSource = booksModels.byId(id).delete;
  const remove = () => {
    return dataSource.dispatch();
  };
  return {
    error: dataSource.getters.error,
    loading: dataSource.getters.loading,
    remove
  };
};

export const DeleteBook = connect(mapDataSourceToProps)(DeleteBookComponent);
