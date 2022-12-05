import {Button, Card} from "react-bootstrap";
import React from "react";
import styles from './styles.module.scss'
import {useDispatch} from "react-redux";
import {deleteMenuItem, editMenuAction} from "../../store/menu";

const MenuItem = ({ item }) => {
  const dispatch = useDispatch();

  const editAction = () => {
    dispatch(editMenuAction(item))
  }

  const deleteAction = () => {
    dispatch(deleteMenuItem(item.id))
  }

  return (
    <div className={styles.Item}>
      <Card>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            {item.label}
            <div className={styles.Actions}>
              <Button variant="primary" onClick={editAction}>Edit</Button>
              <Button variant="danger" onClick={deleteAction}>Delete</Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default MenuItem