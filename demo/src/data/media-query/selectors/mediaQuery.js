/*
Copyright 2019 Javier Brea
Copyright 2019 XbyOrange

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

import { Selector } from "@data-provider/core";
import { desktopCollection } from "../origins/desktopCollection";
import { mobileCollection } from "../origins/mobileCollection";
import { mediaQueryFiltered } from "../origins/mediaQuery";

// Example of a Selector that can return different origins depending of previous origin results
export const deviceDataFiltered = new Selector(
  {
    source: mediaQueryFiltered,
    query: () => "device"
  },
  device => {
    const apiToCall = device === "mobile" ? mobileCollection : desktopCollection;
    return apiToCall;
  },
  []
);

let previousDevice;
const mobileMaxWidth = 800;

window.onresize = () => {
  const width = window.innerWidth,
    device = width <= mobileMaxWidth ? "mobile" : "desktop";
  if (previousDevice !== device) {
    previousDevice = device;
    mediaQueryFiltered.query("device").update(device);
  }
};

window.onresize();
