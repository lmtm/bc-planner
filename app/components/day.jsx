import '../styles/day'

import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import { Map, Set } from 'immutable'

import Gravatar from './gravatar'
import EventBars from './event-bars'
import { inclusiveIsBetween, isWeekend } from './../utils/date'

export default class Day extends Component {

  static propTypes = {
    date: PropTypes.object.isRequired,
    events: PropTypes.arrayOf(PropTypes.object).isRequired,
    filters: PropTypes.instanceOf(Map).isRequired,
    visibleClubbers: PropTypes.instanceOf(Set).isRequired
  }

  renderEvent (event) {
    const { filters } = this.props
    return (
      <li className="event" key={event.id}>
        <div className="event-snippet">
          {filters.get('title') ? this.renderTitle(event) : null}
          {filters.get('location') ? this.renderLocation(event) : null}
        </div>
        {filters.get('gravatar') ? this.renderGravatar(event) : null}
      </li>
    )
  }

  renderTitle (event) {
    return <div className="event-title">{event.title}</div>
  }

  renderLocation (event) {
    return <div className="event-location">{event.location}</div>
  }

  renderGravatar (event) {
    return (
      <div className="event-gravatar">
        <Gravatar clubberEmail={event.clubber} />
      </div>
    )
  }

  render () {
    const { date, filters, visibleClubbers } = this.props
    const events = this.props.events.filter(event =>
      inclusiveIsBetween(date, event.start, event.end)
    )
    .map(event => { event.visible = visibleClubbers.includes(event.clubber); return event })

    return (
      <div className={classNames('day', { 'day-weekend': isWeekend(date) })}>
        <header className="day-date">{date.format('dd')[0]} {date.format('DD')}</header>
        <ul className="event-list">
          {events.map(event => (event.visible ? this.renderEvent(event) : null))}
        </ul>
        {filters.get('bars') ? <EventBars events={events} visibleClubbers={visibleClubbers} /> : null}
      </div>
    )
  }

}
