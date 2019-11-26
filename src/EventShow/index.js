import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'

class EventShow extends Component {
    state = {
        event: null
    }
    async componentDidMount() {
        this.getEvent()
    }

    getEvent = async () => {
    }
    render() {

        return (
                <div className='eventAtt'>
                TITLE:<br/>
                {this.props.event.title}<br/><br/>
                VENUE:<br/>
                {this.props.event.venueName}<br/><br/>
                CITY:<br/>
                {this.props.event.city}<br/><br/>
                </div>
            )
    }
}

export default EventShow