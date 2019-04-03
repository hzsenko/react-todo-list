import React, { Component } from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import TodoList from '../todo-list';
import AddItem from "../add-item";
import './app.scss';

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ],
    term: '',
    filter: 'all'
  };

  createTodoItem(label) {
    return {
      id: this.maxId++,
      label: label,
      done: false,
      important: false
    }
  }

  addTodo = (label) => {
    const newTodo = this.createTodoItem(label);

    this.setState(({ todoData }) => {
      return {
        todoData: [...todoData, newTodo]
      }
    })
  };

  deleteTodo = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.filter(({ id: todoId }) => todoId !== id)
      };
    })
  };

  static sliceArray(array, index, newItem) {
    return [
      ...array.slice(0, index),
      newItem,
      ...array.slice(index + 1)
    ];
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex(({ id: todoId }) => todoId === id);
      const oldItem = todoData[index];
      const newItem = { ...oldItem, important: !oldItem.important };
      const newArray = App.sliceArray(todoData, index, newItem);

      return {
        todoData: newArray
      }
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex(({ id: todoId }) => todoId === id);
      const oldItem = todoData[index];
      const newItem = { ...oldItem, done: !oldItem.done };
      const newArray = App.sliceArray(todoData, index, newItem);

      return {
        todoData: newArray
      }
    })
  };

  search(data, term) {
    if (term.length === 0) {
      return data;
    }
    return data.filter(({ label }) => {
      return label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    })
  }

  onSearchTodos = (term) => {
    this.setState({ term });
  };

  static filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter(({ done }) => !done);
      case 'done':
        return items.filter(({ done }) => done);
      default:
        return items;
    }
  }

  onFilterChange = (filter) => {
    this.setState({ filter })
  };

  render() {
    const { todoData, term, filter } = this.state;

    const doneItems = todoData.filter(({ done }) => done).length;
    const toDoItems = todoData.length - doneItems;

    const visibleData = App.filter(this.search(todoData, term), filter);

    return (
      <div className="todo-app">
        <AppHeader done={ doneItems }
                   toDo={ toDoItems }/>

        <div className="top-panel">
          <SearchPanel onSearchTodos={ this.onSearchTodos }/>
          <ItemStatusFilter filter={ filter }
                            onFilterChange={ this.onFilterChange }/>
        </div>

        <TodoList
          onDeleted={ this.deleteTodo }
          onToggleDone={ this.onToggleDone }
          onToggleImportant={ this.onToggleImportant }
          todos={ visibleData }/>
        <AddItem addItem={ this.addTodo }/>
      </div>
    )
  }
};
