import React from 'react';
import { Grid, Button } from 'semantic-ui-react';

function EventList(props){ 

  const events = props.events.map((event) => {
    return (
      <Grid key={event.id}>
        <Grid.Column>{event.sport}</Grid.Column>
        <Grid.Column>{event.teams}</Grid.Column>
        <Grid.Column>{event.date}</Grid.Column>
        <Grid.Column>{event.time}</Grid.Column>
        <Grid.Column>{event.location}</Grid.Column>
        <Grid.Column>{event.tickets}</Grid.Column>
          <Grid extra>
            <Button onClick={() => props.deleteEvent(event.id)}>Delete Event</Button>
            <Button onClick={() => props.openAndEdit (event)}>Edit Event</Button>
          </Grid>
      </Grid>
        
        )
  })

  return (
      <>
        { events }
      </>
    )
}

export default EventList