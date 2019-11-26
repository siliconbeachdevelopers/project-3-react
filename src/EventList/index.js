import React, {Component} from 'react';
import { Grid, Image, Button, Icon, GridColumn } from 'semantic-ui-react';
import Moment from 'react-moment'


function EventList(props){    
  return (
      <Grid>
        {
          props.events.map(event => {
            return (<Grid.Row className='border'>
              <Grid.Column width={3}>
                <Image src={event.strSportThumb}/>
                <Grid.Column width={9}>
                  {/* <Button onClick={() => this.deleteEvent(e.id)}>Delete Event</Button> */}
                </Grid.Column>
              </Grid.Column>
              <Grid.Column width={10}>
                <div className="centeritems">
                  <span id="headtitle">{event.short_title}</span><br></br>
                  <br></br>
                  <span id='datetime'>{event.datetime_local}</span><br></br>
                  <Moment className='time' format={"hh:mm"}>
                    {new Date(event.time).toString()}
                  </Moment>pm<br></br><br></br>
                  <span id='lowprice'>Lowest Price ${event.stats.lowest_price}</span>
                  <div className="button">
                    <Button onClick={() => this.props.showEachEvent()} className="button1" color="black" size='big'>Go</Button>
                  </div>
                  <span id='venuename'>{event.venue.name}</span>
          <span id='city'>{event.venue.display_location}</span>
                </div>
              </Grid.Column>
              <Grid.Column width={3}>
                <Image id='imagecover' src={event.performers[0].image} />
              </Grid.Column>
            </Grid.Row>)
          })
        }
      </Grid>
  )
}

export default EventList