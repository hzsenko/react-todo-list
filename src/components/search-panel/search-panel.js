import React, { Component } from 'react';
import './search-panel.scss';

export default class SearchPanel extends Component {
  state = {
    term: ''
  };

  onSearch = (e) => {
    const term = e.target.value;
    this.setState({ term });
    this.props.onSearchTodos(term);
  };

  render() {
    const { term } = this.state;

    return <input type="text"
                  onChange={ this.onSearch }
                  value={ term }
                  className="form-control search-input"
                  placeholder="search"/>;
  }
}
