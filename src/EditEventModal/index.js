import React from 'react'
import { Modal, Form, Button, Label, Header } from 'semantic-ui-react';

const EditEventModal = (props) => {
  console.log(props)
  return (
    <Modal open={props.showEditModal}>
      <Header>Edit Event</Header>
      <Modal.Content>
        <Form onSubmit={props.closeAndEdit}>
          <Label>
            Sport:
          </Label>
          <Form.Input type='text' name='sport' value={props.eventToEdit.sport} onChange={props.handleEditChange}/>
          <Label>
            Teams:
          </Label>
          <Form.Input type='text' name='teams' value={props.eventToEdit.genre} onChange={props.handleEditChange}/>
          <Label>
            Date:
          </Label>
          <Form.Input type='text' name='date' value={props.eventToEdit.platform} onChange={props.handleEditChange}/>
          <Label>
            Time:
          </Label>
          <Form.Input type='text' name='time' value={props.eventToEdit.platform} onChange={props.handleEditChange}/>
          <Label>
            Location:
          </Label>
          <Form.Input type='text' name='location' value={props.eventToEdit.platform} onChange={props.handleEditChange}/>
          <Label>
            Tickets:
          </Label>
          <Form.Input type='text' name='tickets' value={props.eventToEdit.platform} onChange={props.handleEditChange}/>
          <Modal.Actions>
            <Button color='green' type='submit'>Edit Event</Button>
          </Modal.Actions>
        </Form>
      </Modal.Content>
    </Modal>
    )
}

export default EditEventModal;