import React from 'react';
import TodoListItem from '../todo-list-item/todo-list-item';
import './todo-list.scss';


const TodoList = ({ todos, onDeleted, onToggleImportant, onToggleDone }) => {
  const elements = todos.map(({ id, ...options }) => {
    return (
      <li key={ id }
          className="list-group-item">
        <TodoListItem
          onToggleImportant={ () => onToggleImportant(id) }
          onToggleDone={ () => onToggleDone(id) }
          onDeleted={ () => onDeleted(id) }
          { ...options }
        />
      </li>
    );
  });
  const noResult = !elements.length ? <div className="empty-search">Ничего не найдено</div> : '';

  return <ul className="list-group todo-list">
    { elements }
    { noResult }
  </ul>;
};

export default TodoList;