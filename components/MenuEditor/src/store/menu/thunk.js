import {addMenuAction, deleteMenuAction, fetchMenuAction, updateMenuAction} from "./actions";

export const fetchMenu = () => async (dispatch) => dispatch(fetchMenuAction());

export const addMenuItem = (data) => async (dispatch) => dispatch(addMenuAction(data));

export const updateMenuItem = (id, data) => async (dispatch) => dispatch(updateMenuAction(id, data));

export const deleteMenuItem = (id) => async (dispatch) => dispatch(deleteMenuAction(id));