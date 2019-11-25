import React, { Component } from 'react'

class EventShow extends Component {
    state = {
        event: null
    }
    async componentDidMount() {
        this.getEvent()
    }

    getEvent = async () => {
        console.log(this.props.match.params.id)
        const eventId = this.props.match.params.id
        
        const reqEvent = await fetch(`https://api.seatgeek.com/2/events/${eventId}?client_id=${process.env.REACT_APP_API_KEY}`)
        const parsedEvent = await reqEvent.json()
        this.setState({
            event: parsedEvent
           
        })
    }

    render() {
        console.log(this.props, 'this is props view event')
        console.log(this.state.event, '<----------------------this is state view')
        return (
            <div>
                {
                    this.props.event 
                    ? 
                    <div>
                        <h1>{this.props.event.title}</h1>
                        <h3>{this.props.event.venueName}</h3>
                        <h3>{this.props.event.city}</h3>
                    </div>
                    :
                    null
                } 
                {
                    this.state.event
                    ? 
                    <div>
                        <h1>{this.state.event.title}</h1>
                        {/* <h3>{this.state.event.venue.address}</h3> */}
                        <h3>{this.state.event.city}</h3>
                    </div>
                    :
                    null
                }
            </div>
            )
    }
}

export default EventShow