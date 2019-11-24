/*
Copyright 2019 Javier Brea
Copyright 2019 XbyOrange

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

import { warn } from "./utils";

const serverSideData = new Set();

const readProviderValue = provider => {
  return provider.read().then(value => {
    return Promise.resolve({
      id: provider._id,
      value
    });
  });
};

const resultsToObject = results => {
  return Promise.resolve(
    results.reduce((allResults, result) => {
      if (allResults.hasOwnProperty(result.id)) {
        warn(
          `Duplicated Data Provider id ${result.id} detected in server-side-data. Data may not be assigned properly to correspondent providers in client-side`
        );
      }
      allResults[result.id] = result.value;
      return allResults;
    }, {})
  );
};

export const readOnServerSide = providers => {
  if (providers) {
    const providersToAdd = Array.isArray(providers) ? providers : [providers];
    providersToAdd.forEach(provider => {
      serverSideData.add(provider);
    });
  }
};

export const addServerSideData = readOnServerSide;

export const readServerSide = providers => {
  readOnServerSide(providers);
  return Promise.all(Array.from(serverSideData).map(readProviderValue)).then(resultsToObject);
};

export const readServerSideData = readServerSide;

export const clearServerSide = () => {
  serverSideData.clear();
};
