import React, { useState, useRef, useEffect } from 'react';
import ListItems from './ListItems';
import classes from './List.module.css';
import { Draggable } from 'react-beautiful-dnd';

const List = (props) => {
  const { onItemList, items } = props;
  const itemList = useRef();
  const itemListValue = itemList.current;

  const [itemLeft, setItemleft] = useState();
  const leftHandler = (left) => {
    setItemleft(left.length);
  };

  useEffect(() => {
    onItemList(itemListValue);
  }, [onItemList]);

  return (
    <ul ref={itemList} className={classes['grocery-list']}>
      {items.map((item, index) => (
        <Draggable draggableId={item.id.toString()} key={item.id} index={index}>
          {(provider, snapshot) => (
            <div
              ref={provider.innerRef}
              {...provider.draggableProps}
              {...provider.dragHandleProps}
            >
              <ListItems
                key={item.id}
                id={item.id}
                title={item.title}
                onRemoveItem={props.removeItem}
                onEditItems={props.editItems}
                onCompleted={props.onComplete}
                onItemLeft={leftHandler}
              />
            </div>
          )}
        </Draggable>
      ))}

      <li className={classes['container-actions']}>
        <p>{itemLeft} items left</p>
        <span>
          <button onClick={props.onAll}>all</button>
          <button onClick={props.onActive}>active</button>
          <button onClick={props.onShowCompleted}>completed</button>
        </span>
        <button onClick={props.onClear}>clear all</button>
      </li>
    </ul>
  );
};

export default List;
