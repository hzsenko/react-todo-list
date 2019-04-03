import React, { Component } from 'react';
import './add-item.scss';

export default class AddItem extends Component {

  onSubmit = (e) => {
    e.preventDefault();
    if (this.inputLabel.value.trim()) {
      this.props.addItem(this.inputLabel.value);
      this.inputLabel.value = '';
    }
  };

  render() {
    return (
      <form className="add-item"
            onSubmit={ this.onSubmit }>
        <input type="text"
               ref={ el => this.inputLabel = el }
               className="form-control add-item__input"
               placeholder="Add new todo"/>
        <button type="submit"
                className="btn btn-outline-secondary add-item__button">Add item
        </button>
      </form>
    )
  }
};

