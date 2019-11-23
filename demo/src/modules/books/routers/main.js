/*
Copyright 2019 XbyOrange

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";

import { BooksListLayout, BooksDetailsLayout } from "../views/Layouts";

export const MainRouter = ({ match }) => (
  <Switch>
    <Route exact path={`${match.path}`} component={BooksListLayout} />
    <Route path={`${match.path}/:id`} component={BooksDetailsLayout} />
  </Switch>
);

MainRouter.propTypes = {
  match: PropTypes.any
};
