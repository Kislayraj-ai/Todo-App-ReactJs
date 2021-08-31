import React from 'react';
import ListItems from './ListItems';
import classes from './List.module.css';

const List = (props) => {
  return (
    <ul className={classes['grocery-list']}>
      {props.items.map((item) => (
        <ListItems
          key={item.id}
          id={item.id}
          title={item.title}
          onRemoveItem={props.removeItem}
          onEditItems={props.editItems}
        />
      ))}
    </ul>
  );
};

export default List;
