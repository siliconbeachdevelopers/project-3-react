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
            What's The Event?:
          </Label>
          <Form.Input type='text' name='title' value={props.eventToEdit.title} onChange={props.handleEditChange}/>
          <Label>
            Venue Name:
          </Label>
          <Form.Input type='text' name='venueName' value={props.eventToEdit.venueName} onChange={props.handleEditChange}/>
          <Label>
            City:
          </Label>
          <Form.Input type='text' name='city' value={props.eventToEdit.city} onChange={props.handleEditChange}/>
          {/* <Label>
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
          <Form.Input type='text' name='tickets' value={props.eventToEdit.platform} onChange={props.handleEditChange}/> */}
          <Modal.Actions>
            <Button color='green' type='submit'>Edit Event</Button>
          </Modal.Actions>
        </Form>
      </Modal.Content>
    </Modal>
    )
}

export default EditEventModal;