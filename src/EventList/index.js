import React from 'react';
import { Grid, Button } from 'semantic-ui-react';

function EventList(props){ 

  const events = props.events.map((event) => {
    return (
      <Grid key={event.id}>
        <Grid.Column>{event.title}</Grid.Column>
        <Grid.Column>{event.venueName}</Grid.Column>
        <Grid.Column>{event.city}</Grid.Column>
        {/* <Grid.Column>{event.time}</Grid.Column>
        <Grid.Column>{event.location}</Grid.Column>
        <Grid.Column>{event.tickets}</Grid.Column> */}
      </Grid>
        
        )
  })

  return (
      <>
        {}
      </>
    )
}

export default EventList