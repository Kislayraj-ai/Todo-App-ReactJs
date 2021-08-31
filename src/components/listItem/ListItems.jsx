import React from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import classes from './ListItems.module.css';

const ListItems = (props) => {
  const { title, id, onRemoveItem, onEditItems } = props;

  const removeHandler = () => {
    onRemoveItem(id);
  };

  const editHandler = () => {
    onEditItems(id);
  };
  return (
    <li className={classes['grocery-item']}>
      <p className={classes.title}> {title}</p>
      <div className={classes.actions}>
        <button
          type="button"
          className={classes['edit-btn']}
          onClick={editHandler}
        >
          <FaPencilAlt></FaPencilAlt>
        </button>
        <button
          type="button"
          className={classes['delete-btn']}
          onClick={removeHandler}
        >
          <FaTrash></FaTrash>
        </button>
      </div>
    </li>
  );
};

export default ListItems;
