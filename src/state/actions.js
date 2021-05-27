import {
  CHANGE_ITEM,
  CHANGE_PAGE,
  SAVE_ACCOUNT,
  SAVE_CONTRACT,
  SAVE_ITEMS,
  SAVE_PASS,
  SAVE_WEB3,
  FILTER_ITEMS,
} from "./constants";

// Changes the current visible page
export const goTo = (payload) => {
  return { type: CHANGE_PAGE, payload };
};

// Action to save web3 connection
export const saveWeb3 = (payload) => {
  return { type: SAVE_WEB3, payload };
};

// Action to save contract connection
export const saveContract = (payload) => {
  return { type: SAVE_CONTRACT, payload };
};

// Action to save user cyphered password
export const savePassword = (payload) => {
  return { type: SAVE_PASS, payload };
};

// Action to save user's password
export const saveAccount = (payload) => {
  return { type: SAVE_ACCOUNT, payload };
};

// DISPLAY

// Action to save user's decripted item
export const saveItems = (payload) => {
  return { type: SAVE_ITEMS, payload };
};

// Action to save user's decripted item
export const changeItem = (payload) => {
  return { type: CHANGE_ITEM, payload };
};

// Action to save user's decripted item
export const filterItems = (payload) => {
  return { type: FILTER_ITEMS, payload };
};
