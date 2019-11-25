import React, { Component } from 'react'

class EventShow extends Component {
    state = {
        event: {}
    }
    async componentDidMount() {
        console.log(this.props.match.params.id)
        const eventId = this.props.match.params.id
        const reqEvent = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/events/${eventId}`)
        const parsedEvent = await reqEvent.json()
        console.log(parsedEvent)
        this.setState({
            event: parsedEvent.data
        })
    }
    render() {
        return (
            <div>
                <h1>{this.state.event.title}</h1>
                <h3>{this.state.event.venueName}</h3>
                <h3>{this.state.event.city}</h3>
                {/* <h3>{this.state.event.time}</h3>
                <h3>{this.state.event.location}</h3>
                <h3>{this.state.event.tickets}</h3> */}
            </div>
            )
    }
}

export default EventShow