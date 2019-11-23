/*
Copyright 2019 Javier Brea
Copyright 2019 XbyOrange

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

import React from "react";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";

import { routes, sectionsAsArray } from "./Router";

import { baseApi } from "./config";

import { apis } from "@data-provider/axios";

import "./app.css";

apis.config({
  baseUrl: baseApi
});

export class App extends React.Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter basename={routes.index.route}>
          <Switch>
            <Redirect exact from={routes.index.route} to={routes.index.redirectTo} />
            {sectionsAsArray.map(section => (
              <Route key={section.route} path={section.route} component={section.component} />
            ))}
            <Route component={routes.notFound.component} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
