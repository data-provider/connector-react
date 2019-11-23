/*
Copyright 2019 Javier Brea
Copyright 2019 XbyOrange

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

const serverSideData = new Set();

const readSourceValue = source => {
  return source.read().then(value => {
    return Promise.resolve({
      id: source._id,
      value
    });
  });
};

const resultsToObject = results => {
  return Promise.resolve(
    results.reduce((allResults, result) => {
      if (allResults.hasOwnProperty(result.id)) {
        console.warn(
          `Duplicated Data Provider id ${result.id} detected in server-side-data. Data may not be assigned properly to correspondent sources in client-side`
        );
      }
      allResults[result.id] = result.value;
      return allResults;
    }, {})
  );
};

export const readOnServerSide = sources => {
  if (sources) {
    const sourcesToAdd = Array.isArray(sources) ? sources : [sources];
    sourcesToAdd.forEach(source => {
      serverSideData.add(source);
    });
  }
};

export const addServerSideData = readOnServerSide;

export const readServerSide = sources => {
  readOnServerSide(sources);
  return Promise.all(Array.from(serverSideData).map(readSourceValue)).then(resultsToObject);
};

export const readServerSideData = readServerSide;

export const clearServerSide = () => {
  serverSideData.clear();
};
