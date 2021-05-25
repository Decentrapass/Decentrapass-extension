import {
  CHANGE_ITEM,
  CHANGE_PAGE,
  SAVE_ACCOUNT,
  SAVE_CONTRACT,
  SAVE_ITEMS,
  SAVE_PASS,
  SAVE_WEB3,
} from "./constants";

const initialState = {
  page: "register", // Current visible page
  web3: null, // Saves the web3 access point,
  contract: null, // Saves the contract access point,
  account: "", // Saves the users address
  password: "", // Saves the users cyphered password
  items: [],
  displayedItem: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PAGE: // Redirect
      return {
        ...state,
        page: action.payload,
      };
    case SAVE_WEB3: // Web3 endpoint
      return {
        ...state,
        web3: action.payload,
      };
    case SAVE_CONTRACT: // Contract interface
      return {
        ...state,
        contract: action.payload,
      };
    case SAVE_PASS: // User's password
      return {
        ...state,
        password: action.payload,
      };
    case SAVE_ACCOUNT: // User's account
      return {
        ...state,
        account: action.payload,
      };
    case SAVE_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    case CHANGE_ITEM:
      return {
        ...state,
        displayedItem: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
