import React, { useState, useEffect } from 'react';
import List from '../listItem/List';

import classes from './GroceryForm.module.css';

const getlocalStorage = () => {
  let list = localStorage.getItem('Items');
  if (list) return JSON.parse(localStorage.getItem('Items'));
  else return [];
};

const GroceryForm = () => {
  const [name, setName] = useState();
  const [list, setList] = useState(getlocalStorage());
  const [editId, setEditId] = useState();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem('Items', JSON.stringify(list));
  }, [list]);

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const EditItem = (id) => {
    const specific = list.find((item) => item.id === id);
    setEditId(id);
    setIsEditing(true);
    setName(specific.title);
  };

  const RemoveItem = (id) => {
    let newList = list.filter((item) => item.id !== id);
    setList(newList);
  };
  const ClearItem = () => {
    setList([]);
  };

  const SubmitHandler = (e) => {
    e.preventDefault();

    if (!name) {
      return;
    } else if (name && isEditing) {
      const editedItem = list.map((item) => {
        if (item.id === editId) {
          return { id: item.id, title: name };
        }
        return item;
      });

      setList(editedItem);
      setIsEditing(false);
      setEditId(null);
    } else {
      let newItem = {
        id: new Date().getTime().toString(),
        title: name,
      };
      setList(list.concat(newItem));
    }

    setName('');
  };

  return (
    <section className={classes['section-center']}>
      <form className={classes['grocery-form']} onSubmit={SubmitHandler}>
        <h3>To-Do List</h3>
        <div className={classes['form-control']}>
          <input
            type="text"
            placeholder="list items"
            value={name}
            onChange={nameHandler}
          />
          <button type="submit" className={classes['add-btn']}>
            {isEditing ? 'edit' : 'add'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="gorcery-container">
          <List items={list} removeItem={RemoveItem} editItems={EditItem} />
          <button className={classes['clear-btn']} onClick={ClearItem}>
            Clear list
          </button>
        </div>
      )}
    </section>
  );
};

export default GroceryForm;
