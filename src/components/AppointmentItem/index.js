import './index.css'

import {format, isValid} from 'date-fns'

const AppointmentItem = props => {
  const {appointmentDetail, likeAction} = props

  const {id, title, date, like} = appointmentDetail

  const parsedDate = new Date(date)
  const dateNew = isValid(parsedDate)
    ? format(parsedDate, 'dd MMMM yyyy, EEEE')
    : 'Invalid Date'

  const starImgUrl = like
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onFavour = () => {
    likeAction(id)
  }
  return (
    <li className="appointment-card">
      <div className="heading-favorite-card">
        <p className="title-para">{title}</p>
        <button
          data-testid="star"
          type="button"
          onClick={onFavour}
          className="star-btn"
        >
          <img className="star-logo" alt="star" src={starImgUrl} />
        </button>
      </div>
      <p className="date-para">{dateNew}</p>
    </li>
  )
}

export default AppointmentItem
