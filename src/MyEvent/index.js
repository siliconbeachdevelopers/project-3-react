import React from 'react';
import { Grid } from 'semantic-ui-react';



function MyEvents(props){

    const ListEvents = props.events.map((event) => {
      return (
        <Grid key={event.id}>
          <Grid.Column>Mobile Fourth</Grid.Column>
          <Grid.Column>Mobile Third</Grid.Column>
          <Grid.Column>Mobile Second</Grid.Column>
          <Grid.Column>Mobile First</Grid.Column>
        </Grid>
      )  
  })
}
 
 
 
 
 
  export default MyEvents













