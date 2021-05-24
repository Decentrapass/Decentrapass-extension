import {
  ADD_ITEM,
  CHANGE_ACCOUNT,
  CHANGE_ITEM,
  DATA_RETRIEVE,
  FILTER_ITEMS,
  PAGE_CHANGE,
  SAVE_WEB3,
} from "./constants";

const initialState = {
  page: "locked", // A self-made router
  addingItem: "", // To display the correct interface when adding an item
  items: [], // Items received from backend
  displayedItems: [], // Items displayed (for searching)
  currentItem: null, // To chose what item to display
  web3: null, // Saves the contract access point,
  account: "", // Saves the users address
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_RETRIEVE: // User successfully logged in and we queried their data
      return {
        ...state,
        items: action.payload,
        displayedItems: action.payload,
      };
    case CHANGE_ITEM: // User clicked on object and we display that object's data
      return {
        ...state,
        currentItem: action.payload,
      };
    case PAGE_CHANGE: // Redirecting a user
      return {
        ...state,
        page: action.payload,
      };
    case ADD_ITEM: // Change item creation interface
      return {
        ...state,
        addingItem: action.payload,
      };
    case FILTER_ITEMS: // User searched
      return {
        ...state,
        displayedItems: action.payload,
      };
    case SAVE_WEB3: // User searched
      return {
        ...state,
        web3: action.payload,
      };
    case CHANGE_ACCOUNT: // User searched
      return {
        ...state,
        account: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
