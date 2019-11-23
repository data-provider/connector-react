/*
Copyright 2019 XbyOrange

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

const dataMobile = [
  ["mobile data 1", "mobile data 2"],
  ["mobile data 3", "mobile data 4"],
  ["mobile data 5", "mobile data 6"]
];

const dataDesktop = [
  ["desktop data 1", "desktop data 2", "desktop data 3", "desktop data 4"],
  ["desktop data 5", "desktop data 6", "desktop data 7", "desktop data 8"],
  ["desktop data 9", "desktop data 10", "desktop data 11", "desktop data 12"]
];

const getMobileData = {
  url: "/datamobile",
  method: "GET",
  response: (req, res) => {
    res.status(200);
    res.send(dataMobile);
  }
};

const getDesktopData = {
  url: "/datadesktop",
  method: "GET",
  response: (req, res) => {
    res.status(200);
    res.send(dataDesktop);
  }
};

module.exports = {
  getMobileData,
  getDesktopData
};
