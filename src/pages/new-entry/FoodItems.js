import React, { useReducer } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';

import './FoodItems.css';

import {
  getFoodItemInputNamePrefix,
  NUMBER_OF_FOOD_ITEMS_TO_CREATE_BY_DEFAULT,
} from './NewEntryPage.utils';

const FoodItem = ({ item, index, addNewItem, editItem, removeItem }) => {
  const editItemName = e => {
    editItem(index, { name: e.target.value });
  };

  const removeFoodItem = () => {
    removeItem(index);
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addNewItem();
    }
  };

  return (
    <div className="food-items__item --mb-2">
      <input
        type="text"
        name={getFoodItemInputNamePrefix(index)}
        className="food-items__item-name-input"
        aria-label={`Продукт/блюдо #${index + 1}`}
        value={item.name}
        onChange={editItemName}
        onKeyPress={handleKeyPress}
      />
      <button
        type="button"
        className="food-items__item-btn food-items__remove-btn"
        aria-label={`Удалить продукт/блюдо #${index + 1}`}
        onClick={removeFoodItem}
      >
        <FiX />
      </button>
    </div>
  );
};

// Shouldn't be saved to the database, it's used only to create an id that could serve as a key to the form elements;
let idIncrement = 0;

const createNewFoodItem = () => {
  idIncrement = idIncrement + 1;

  return { id: idIncrement, name: '' };
};

// Empty fields do not count anyway, so better to create some items beforehand
const initialFoodItems = [
  ...Array(NUMBER_OF_FOOD_ITEMS_TO_CREATE_BY_DEFAULT),
].map(() => createNewFoodItem());

const ADD_ITEM_ACTION = 'ADD_ITEM_ACTION';
const EDIT_ITEM_ACTION = 'EDIT_ITEM_ACTION';
const REMOVE_ITEM_ACTION = 'REMOVE_ITEM_ACTION';

const foodItemsReducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM_ACTION: {
      return [...state, createNewFoodItem()];
    }
    case EDIT_ITEM_ACTION: {
      const { index, newData } = action.payload;

      return [
        ...state.slice(0, index),
        { ...state[index], ...newData },
        ...state.slice(index + 1),
      ];
    }
    case REMOVE_ITEM_ACTION: {
      const { index } = action.payload;

      if (state.length === 1) {
        return state;
      }

      return [...state.slice(0, index), ...state.slice(index + 1)];
    }
    default:
      return state;
  }
};

const FoodItems = () => {
  const [foodItems, dispatch] = useReducer(foodItemsReducer, initialFoodItems);

  const addNewItem = () => {
    dispatch({ type: ADD_ITEM_ACTION });
  };

  const editItem = (index, { name }) => {
    dispatch({ type: EDIT_ITEM_ACTION, payload: { index, newData: { name } } });
  };

  const removeItem = index => {
    dispatch({ type: REMOVE_ITEM_ACTION, payload: { index } });
  };

  return (
    <fieldset className="food-items">
      <legend>Продукты/блюда</legend>
      {foodItems.map((item, index) => {
        return (
          <FoodItem
            key={item.id}
            item={item}
            index={index}
            addNewItem={addNewItem}
            editItem={editItem}
            removeItem={removeItem}
          />
        );
      })}
      <button
        type="button"
        className="food-items__item-btn --ml-auto"
        aria-label="Добавить продукт/блюдо"
        onClick={addNewItem}
      >
        <FiPlus />
      </button>
    </fieldset>
  );
};

export default FoodItems;
