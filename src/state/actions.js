import {
  ADD_ITEM,
  CHANGE_ACCOUNT,
  CHANGE_ITEM,
  DATA_RETRIEVE,
  FILTER_ITEMS,
  PAGE_CHANGE,
  SAVE_WEB3,
} from "./constants";

// Action to save received items from backend
export const saveItems = (payload) => {
  return { type: DATA_RETRIEVE, payload };
};

// Action to display an item
export const changeItem = (payload) => {
  return { type: CHANGE_ITEM, payload };
};

// Action to redirect user
export const changePage = (payload) => {
  return { type: PAGE_CHANGE, payload };
};

// Action to change creation interface
export const addItem = (payload) => {
  return { type: ADD_ITEM, payload };
};

// Action to change displayed items
export const filterItems = (payload) => {
  return { type: FILTER_ITEMS, payload };
};

// Action to change the users account
export const changeAccount = (payload) => {
  return { type: CHANGE_ACCOUNT, payload };
};

// Action to save web3 connection
export const saveWeb3 = (payload) => {
  return { type: SAVE_WEB3, payload };
};
