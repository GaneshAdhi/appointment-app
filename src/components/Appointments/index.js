import './index.css'

import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {title: '', date: '', appointmentList: [], activeStatus: false}

  onTitle = event => {
    this.setState({title: event.target.value})
  }

  ondate = event => {
    this.setState({date: event.target.value})
  }

  onSubmitEvent = event => {
    event.preventDefault()
    const {title, date} = this.state
    if (title === '') {
      alert('Please Enter Title')
    } else if (date === '') {
      alert('Please Enter Date')
    } else {
      const appointmentDetail = {id: uuidv4(), title, date, like: false}
      this.setState(prevState => ({
        appointmentList: [...prevState.appointmentList, appointmentDetail],
        title: '',
        date: '',
      }))
    }
  }

  onFavouriteAction = appointmentId => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(each => {
        if (appointmentId === each.id) {
          return {...each, like: !each.like}
        }
        return each
      }),
    }))
  }

  onStarted = () => {
    this.setState(prevState => ({activeStatus: !prevState.activeStatus}))
  }

  getFillterData = () => {
    const {activeStatus, appointmentList} = this.state
    if (activeStatus === true) {
      const filterList = appointmentList.filter(
        each => activeStatus === each.like,
      )
      return filterList
    }
    return appointmentList
  }

  render() {
    const {title, date} = this.state

    const filterData = this.getFillterData()

    return (
      <div className="main-container">
        <div className="inner-card">
          <div className="logo-and-from-card">
            <div className="heading-and-form-card">
              <h1 className="main-heading">Add Appointment</h1>
              <form onSubmit={this.onSubmitEvent} className="form-container">
                <label htmlFor="titleId" className="label-style">
                  TITLE
                </label>
                <input
                  value={title}
                  onChange={this.onTitle}
                  className="input-style"
                  placeholder="Title"
                  type="text"
                  id="titleId"
                />
                <label htmlFor="dateId" className="label-style">
                  DATE
                </label>
                <input
                  onChange={this.ondate}
                  className="input-style"
                  type="date"
                  id="dateId"
                  value={date}
                />
                <button className="add-btn" type="submit">
                  Add
                </button>
              </form>
            </div>
            <img
              className="logo"
              alt="appointments"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
            />
          </div>
          <hr className="hr-line-style" />
          <div className="heading-and-btn-card">
            <h1 className="second-heading">Appointments</h1>
            <button
              onClick={this.onStarted}
              className="no-starred-active"
              type="button"
            >
              Starred
            </button>
          </div>
          <ul className="appointment-container">
            {filterData.map(eachAppointment => (
              <AppointmentItem
                likeAction={this.onFavouriteAction}
                key={eachAppointment.id}
                appointmentDetail={eachAppointment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
