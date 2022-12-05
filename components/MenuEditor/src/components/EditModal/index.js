import React from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import * as Yup from 'yup';
import {addMenuItem, editMenuAction, menuSelector, updateMenuItem} from "../../store/menu";
import {useFormik} from "formik";

const EditModal = () => {
  const dispatch = useDispatch();
  const {isLoading, editableItem} = useSelector(menuSelector);
  const formik = useFormik({
    initialValues: {
      label: editableItem !== 'NEW' ? editableItem?.label : "",
      link: editableItem !== 'NEW' ? editableItem?.link : "",
    },
    validationSchema: Yup.object().shape({
      label: Yup.string().max(30, 'Max. 30 characters!').required('Label is required!'),
      link: Yup.string().max(30, 'Max. 30 characters!'),
    }),
    enableReinitialize: true,
    onSubmit: saveAction
  })

  function saveAction(values) {
    if (editableItem === 'NEW') {
      dispatch(addMenuItem({
        label: values.label,
        link: values.link
      }))
    } else {
      dispatch(updateMenuItem(editableItem.id, {
        label: values.label,
        link: values.link
      }))
    }
  }

  const hideAction = () => {
    dispatch(editMenuAction(null))
  }

  return (
    <Modal show={editableItem} onHide={hideAction} animation={false}>
      <Form onSubmit={(e) => {
        e.preventDefault();
        formik.submitForm()
      }}>
        <Modal.Header closeButton>
          {editableItem && editableItem !== 'NEW' ? 'Edit Link' : 'Add Link'}
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="label">
            <Form.Label>Label</Form.Label>
            <Form.Control type="text"
                          disabled={isLoading}
                          isInvalid={formik.errors['label']}
                          value={formik.values['label']}
                          onInput={({target: {value}}) => formik.setFieldValue('label', value)}/>
            <Form.Text><span className="text-danger">{formik.errors['label']}</span></Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="link">
            <Form.Label>Link</Form.Label>
            <Form.Control type="text"
                          disabled={isLoading}
                          value={formik.values['link']}
                          onInput={({target: {value}}) => formik.setFieldValue('link', value)}/>
            <Form.Text><span className="text-danger">{formik.errors['link']}</span></Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideAction} disabled={isLoading}>Cancel</Button>
          <Button variant="primary"
                  type="submit"
                  disabled={!formik.isValid || !formik.dirty || isLoading}>{isLoading ? 'Loading...' : 'Save'}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default EditModal