import React, { useState, useEffect, useRef } from 'react';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';
import List from '../listItem/List';

import classes from './GroceryForm.module.css';

export const getlocalStorage = () => {
  let list = localStorage.getItem('Items');
  if (list) return JSON.parse(localStorage.getItem('Items'));
  else return [];
};

const GroceryForm = () => {
  const [name, setName] = useState();
  const [list, setList] = useState(getlocalStorage());
  const [item, setItem] = useState([]);

  useEffect(() => {
    localStorage.setItem('Items', JSON.stringify(list));
  }, [list]);

  const nameHandler = (e) => {
    setName(e.target.value);
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

    if (!name) return;
    else {
      let newItem = {
        id: new Date().getTime().toString(),
        title: name,
        flag: false,
      };
      setList(list.concat(newItem));
    }

    setName('');
  };

  useEffect(() => {
    setItem(list);
  }, [list]);

  //* ============= list actions ===============
  const completeHandler = (newArray) => {
    setList(newArray);
  };

  const allHandler = () => {
    setItem(getlocalStorage());
  };

  const activeHandler = () => {
    const itemsArray = getlocalStorage();
    const completed = itemsArray.filter((item) => {
      if (!item.flag) return item;
      return;
    });
    setItem(completed);
  };

  const showCompleteHandler = () => {
    const itemsArray = getlocalStorage();
    const completed = itemsArray.filter((item) => {
      if (item.flag === true) return item;
      return;
    });
    if (completed.length < 1) return;
    setItem(completed);
  };

  //* ======= change theme  handlers ============

  const [itemList, setItemList] = useState();
  const grocerForm = useRef();
  const changeTheme = useRef();
  const headerRef = useRef();

  const itemListHandler = (allItems) => {
    setItemList(allItems);
  };
  const changeThemeHandler = () => {
    const lightTheme = `${classes.light}`;
    changeTheme.current.classList.toggle(`${classes.theme}`);
    itemList.classList.toggle(lightTheme);
    grocerForm.current.classList.toggle(lightTheme);
    headerRef.current.classList.toggle(`${classes.headerLight}`);
    document.body.classList.toggle(lightTheme);
  };

  //* ================== drag and drop funcitons ============
  const reorder = (list, startIndex, endIndex) => {
    const res = Array.from(list);
    const [removed] = res.splice(startIndex, 1);
    res.splice(endIndex, 0, removed);
    return res;
  };

  const onEndHandler = (result) => {
    setItem(reorder(item, result.source.index, result.destination.index));
  };

  return (
    <section className={classes['section-center']}>
      <header ref={headerRef} className={classes.header}></header>
      <div className={classes.container}>
        <form className={classes['grocery-form']} onSubmit={SubmitHandler}>
          <div className={classes['grocery-header']}>
            <h3>TODO</h3>
            <div
              className={classes.themeButton}
              ref={changeTheme}
              onClick={changeThemeHandler}
            ></div>
          </div>
          <div className={classes['form-control']}>
            <input
              className={classes['grocery-input']}
              ref={grocerForm}
              type="text"
              placeholder="list items"
              value={name}
              onChange={nameHandler}
            />
          </div>
        </form>
        <DragDropContext onDragEnd={onEndHandler}>
          <Droppable droppableId="1234">
            {(provider, snapshot) => (
              <div ref={provider.innerRef}>
                <div className="gorcery-container">
                  {item.length > 0 && (
                    <List
                      items={item}
                      removeItem={RemoveItem}
                      onClear={ClearItem}
                      onComplete={completeHandler}
                      onAll={allHandler}
                      onActive={activeHandler}
                      onShowCompleted={showCompleteHandler}
                      onItemList={itemListHandler}
                    />
                  )}
                </div>
                {provider.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <h4 className={classes.dragDrop}>Drag and Drop</h4>
    </section>
  );
};

export default GroceryForm;
