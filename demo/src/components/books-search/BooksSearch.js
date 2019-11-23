/*
Copyright 2019 XbyOrange

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

import React from "react";
import PropTypes from "prop-types";

import BooksSearchBar from "../books-search-bar";

export class BooksSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      booksLists: null
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.titleFilter !== this.props.titleFilter ||
      prevProps.yearFilter !== this.props.yearFilter ||
      prevProps.sortBy !== this.props.sortBy
    ) {
      this.setState({
        booksLists: this.childsWithTitleFilter(
          this.props.titleFilter.value,
          this.props.yearFilter.value,
          this.props.sortBy.value
        )
      });
    }
  }

  childsWithTitleFilter(titleFilter, yearFilter, sortBy) {
    return React.Children.map(this.props.children, child =>
      React.cloneElement(child, { titleFilter, yearFilter, sortBy })
    );
  }

  handleSearchChange({ title, year, sortBy }) {
    this.props.updateFilters.dispatch({
      title,
      year,
      sortBy
    });
  }

  render() {
    return (
      <div className="component">
        <h3>Books search</h3>
        <BooksSearchBar
          title={this.props.titleFilter.value}
          year={this.props.yearFilter.value}
          sortBy={this.props.sortBy.value}
          onChange={this.handleSearchChange}
        />
        {this.state.booksLists}
      </div>
    );
  }
}

BooksSearch.defaultProps = {
  titleFilter: {},
  yearFilter: {},
  sortBy: {}
};

BooksSearch.propTypes = {
  titleFilter: PropTypes.any,
  yearFilter: PropTypes.any,
  sortBy: PropTypes.any,
  updateFilters: PropTypes.object,
  children: PropTypes.node
};
