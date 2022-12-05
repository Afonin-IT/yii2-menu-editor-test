import {combineActions, handleActions} from "redux-actions";
import {addMenuAction, deleteMenuAction, editMenuAction, fetchMenuAction, updateMenuAction} from "./actions";
import get from 'lodash/get'
import sortByTreeIndex from "../../helpers/sortByTreeIndex";

const initialState = {
  isLoading: false,
  menu: [],
  editableItem: null,
}

const requestHandler = (state) => ({
  ...state,
  isLoading: true,
});

const successHandler = (state, { payload }) => {
  return {
    menu: [...sortByTreeIndex(get(payload, 'data', []))],
    editableItem: null,
    isLoading: false,
  };
};

const failHandler = (state) => {
  return {
    ...state,
    isLoading: false,
  };
};

const addSuccessHandler = (state, { payload }) => {
  const newItem = get(payload, 'data', null);

  return {
    menu: [...state.menu, newItem ? [newItem] : []],
    editableItem: null,
    isLoading: false,
  };
};

const editMenuHandler = (state, { payload }) => {
  console.log('edit menu handler', payload)
  return {
    ...state,
    editableItem: payload.item
  }
}


export const menuReducer = handleActions({
  [combineActions(
    fetchMenuAction,
    addMenuAction,
    updateMenuAction,
    deleteMenuAction,
  )]: requestHandler,
  [combineActions(
    fetchMenuAction.success,
    updateMenuAction.success,
    deleteMenuAction.success
  )]: successHandler,
  [addMenuAction.success]: addSuccessHandler,
  [combineActions(
    fetchMenuAction.fail,
    addMenuAction.fail,
    updateMenuAction.fail,
    deleteMenuAction.fail
  )]: failHandler,
  [editMenuAction]: editMenuHandler
}, {...initialState})
