import React, { useRef, useEffect, useState } from 'react';
import checkedImage from '../../images/icon-check.svg';
import { getlocalStorage } from '../forms/gorceryForm';
import closeImage from '../../images/icon-cross.svg';
import classes from './ListItems.module.css';

const ListItems = (props) => {
  const { title, id, onRemoveItem, onCompleted, onItemLeft } = props;

  const removeHandler = () => {
    onRemoveItem(id);
  };

  //Note:- element selected here for checked complete  handling list items
  const check = useRef();
  const completeTask = useRef();
  let [left, setLeft] = useState([]);
  const items = getlocalStorage();

  const checkHandler = () => {
    const checkBox = check.current;
    const titleName = completeTask.current;

    checkBox.classList.toggle(`${classes.checked}`);
    const checked = checkBox.classList.contains(`${classes.checked}`);
    titleName.classList.toggle(`${classes.completed}`);

    // check whether the item is completed or not
    if (!checked) checkBox.innerHTML = null;
    if (checked) {
      checkBox.innerHTML = `<img  src=${checkedImage} alt="check" />`;
      const editedItem = items.map((item) => {
        if (titleName.textContent === item.title) {
          return { id: item.id, title: item.title, flag: true };
        }
        return item;
      });
      onCompleted(editedItem);
    }
  };
  useEffect(() => {
    const checkBox = check.current;
    const titleName = completeTask.current;
    items.find((item) => {
      if (item.flag === true && titleName.textContent === item.title) {
        checkBox.classList.add(`${classes.checked}`);
        titleName.classList.add(`${classes.completed}`);
        checkBox.innerHTML = `<img  src=${checkedImage} alt="check" />`;
      }
    });
  }, [items]);

  useEffect(() => {
    const leftItems = items.filter((item) => {
      if (!item.flag) return item;
      return;
    });
    setLeft(leftItems);
  }, [onCompleted]);

  useEffect(() => {
    onItemLeft(left);
  }, [left]);

  return (
    <li className={classes['grocery-item']}>
      <div className={classes.check}>
        <span
          ref={check}
          className={classes.checkbox}
          onClick={checkHandler}
        ></span>
        <p className={classes.title} ref={completeTask}>
          {title}
        </p>
      </div>
      <div className={classes.actions}>
        <button
          type="button"
          className={classes['delete-btn']}
          onClick={removeHandler}
        >
          <img src={closeImage} alt="cross" />
        </button>
      </div>
    </li>
  );
};

export default ListItems;

// ============= drag and drop list handler here
// start
// data-index={index}
// draggable="true"
// ref={listItems}
// onDragStart={dragStartHandler}
// onDragOver={dragOverHandler}
// onDragEnter={dragEnterHandler}
// onDragLeave={dragLeaveHandler}
// onDrop={dropHandler}

// const listItems = useRef();
// let [dragStartIndex, setDragStartIndex] = useState();

// const dragStartHandler = useCallback(() => {
//   const listItem = listItems.current;
//   setDragStartIndex(listItem.closest('li').getAttribute('data-index'));
// }, []);
// const dragOverHandler = (e) => {
//   e.preventDefault();
// };
// // const swapItems = (fromIndex, toIndex) => {
// //swap items
// // const itemOne = items[fromIndex];
// // const itemTwo = items[toIndex];
// // items[fromIndex] = items[toIndex];
// // items[toIndex] = items[fromIndex];
// // console.log(items);
// // };
// const dropHandler = () => {
//   const dragIndex = listItems.current.getAttribute('data-index');
//   console.log('drag', dragStartIndex);
//   // swapItems(dragIndex, dragStartIndex);
//   if (listItems.current.classList.contains(`${classes.over}`))
//     listItems.current.classList.remove(`${classes.over}`);
// };
// const dragEnterHandler = () => {
//   listItems.current.classList.add(`${classes.over}`);
// };
// const dragLeaveHandler = () => {
//   if (listItems.current.classList.contains(`${classes.over}`))
//     listItems.current.classList.remove(`${classes.over}`);
// };

//===================
