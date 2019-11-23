/*
Copyright 2019 XbyOrange

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

import React from "react";
import PropTypes from "prop-types";
import Loading from "../loading";
import ErrorComponent from "../error";

export class DeviceDataComponent extends React.Component {
  renderTable(results) {
    return (
      <table>
        <tbody>
          {results.map(row => (
            <tr key={row}>
              {row.map(col => (
                <td key={col}>{col}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    const info = this.props.deviceFilter.value,
      loading = this.props.deviceDataFiltered.loading,
      error = this.props.deviceDataFiltered.error,
      data = this.props.deviceDataFiltered.value;

    return (
      <div className="component">
        <h3>{info.device} Mode</h3>
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorComponent message={error.message} />
        ) : (
          this.renderTable(data)
        )}
      </div>
    );
  }
}

DeviceDataComponent.defaultProps = {
  deviceFilter: {},
  deviceDataFiltered: {}
};

DeviceDataComponent.propTypes = {
  deviceFilter: PropTypes.object,
  deviceDataFiltered: PropTypes.object
};
