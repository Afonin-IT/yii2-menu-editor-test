import get from "lodash/get";
import {createSelector} from "reselect";

const baseState = (state) => get(state, 'menu', null);

export const isLoading = createSelector(baseState, (state) => get(state, 'isLoading', false));

export const menu = createSelector(baseState, (state) => get(state, 'menu', []));

export const editableMenuItem = createSelector(baseState, (state) => get(state, 'editableItem', null));

export const menuSelector = createSelector(isLoading, menu, editableMenuItem, (isLoading, items, editableItem) => ({
  isLoading,
  items,
  editableItem
}))