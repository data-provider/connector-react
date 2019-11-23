/*
Copyright 2019 XbyOrange

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

import React from "react";
import { debounce } from "lodash";
import PropTypes from "prop-types";

export class BooksSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.propsToState();

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleChange = debounce(this.handleChange, 300).bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.title !== this.props.title ||
      prevProps.year !== this.props.year ||
      prevProps.sortBy !== this.props.sortBy
    ) {
      this.setState(this.propsToState());
    }
  }

  propsToState() {
    return {
      title: this.props.title || "",
      year: this.props.year || "",
      sortBy: this.props.sortBy || "id"
    };
  }

  handleTitleChange(event) {
    this.setState({
      ...this.state,
      title: event.target.value
    });
    this.handleChange();
  }

  handleYearChange(event) {
    this.setState({
      ...this.state,
      year: event.target.value
    });
    this.handleChange();
  }

  handleSortChange(event) {
    this.setState({
      ...this.state,
      sortBy: event.target.value
    });
    this.handleChange();
  }

  handleChange() {
    this.props.onChange(this.state);
  }

  render() {
    return (
      <div className="component">
        By title <input type="text" value={this.state.title} onChange={this.handleTitleChange} />
        By year <input type="text" value={this.state.year} onChange={this.handleYearChange} />
        Sort by
        <select onChange={this.handleSortChange} value={this.state.sortBy}>
          <option value="id">id</option>
          <option value="title">title</option>
          <option value="year">year</option>
        </select>
      </div>
    );
  }
}

BooksSearchBar.defaultProps = {
  title: "",
  year: "",
  sortBy: "id"
};

BooksSearchBar.propTypes = {
  onChange: PropTypes.func,
  title: PropTypes.string,
  year: PropTypes.string,
  sortBy: PropTypes.string
};
