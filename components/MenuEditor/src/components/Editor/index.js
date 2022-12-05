import React from "react";
import {Button} from "react-bootstrap";
import MenuList from "../MenuList";
import {useDispatch} from "react-redux";
import {editMenuAction} from "../../store/menu";

const Editor = () => {
  const dispatch = useDispatch();

  const addAction = () => {
    dispatch(editMenuAction('NEW'))
  }

  return (
    <div>
      <Button variant="success" onClick={addAction}>Add new</Button>
      <MenuList />
    </div>
  )
}

export default Editor