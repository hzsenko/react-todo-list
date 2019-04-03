import React, { Component } from 'react';

export default class ItemStatusFilter extends Component {

  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' },
  ];

  onFilter = (name) => {
    return this.props.onFilterChange(name)
  };

  render() {
    const { filter } = this.props;

    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const classNames = isActive ? 'btn-info' : 'btn-outline-secondary';

      return (
        <button type="button"
                key={ name }
                onClick={ () => this.onFilter(name) }
                className={ `btn ${ classNames }` }>
          { label }
        </button>
      );
    });

    return (
      <div className="btn-group">
        { buttons }
      </div>
    );
  }
}
