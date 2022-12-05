import createRequestAction from "../common/createRequestAction";
import {createAction} from "redux-actions";

const PREFIX = 'MENU';

export const fetchMenuAction = createRequestAction(`${PREFIX}__FETCH`, () => ({
  request: {
    url: '/menu'
  }
}));

export const addMenuAction = createRequestAction(`${PREFIX}__ADD`, (data) => ({
  request: {
    method: 'POST',
    url: '/menu',
    data
  }
}));

export const updateMenuAction = createRequestAction(`${PREFIX}__UPDATE`, (id, data) => ({
  request: {
    method: 'PATCH',
    url: `/menu/${id}`,
    data
  }
}));

export const deleteMenuAction = createRequestAction(`${PREFIX}__DELETE`, (id) => ({
  request: {
    method: 'DELETE',
    url: `/menu/${id}`,
  }
}), (id) => ({ id }));

export const editMenuAction = createAction(`${PREFIX}__EDIT`, (item) => ({ item }))
