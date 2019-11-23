/*
Copyright 2019 XbyOrange

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

const booksByAuthor = {
  "1": ["3"],
  "2": ["1"],
  "3": ["2"],
  "4": ["4"]
};

const getAuthorBooks = {
  url: "/authorbooks",
  method: "GET",
  response: (req, res) => {
    const { authorId, all } = req.query;

    let bookIds;
    if (authorId) {
      bookIds = booksByAuthor[authorId];
    } else if (all) {
      bookIds = booksByAuthor;
    } else {
      bookIds = Object.values(booksByAuthor).reduce((acc, values) => {
        return acc.concat(values);
      }, []);
    }

    res.status(200);
    res.send(bookIds);
  }
};

module.exports = {
  getAuthorBooks
};
