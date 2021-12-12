// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    buttonChange: false,
    minutes: 25,
    seconds: 0,
    newMinute: 25,
  }

  changeButton1 = () => {
    this.setState({buttonChange: true})
    this.timerId = setInterval(this.statusChange, 1000)
  }

  statusChange = () => {
    const {newMinute, seconds} = this.state
    if (newMinute === 0 && seconds === 0) {
      clearInterval(this.timerId)
    } else {
      const second = newMinute * 60 - 1 + seconds
      const m = Math.floor(second / 60)
      const s = second % 60
      this.setState({seconds: s, newMinute: m})
    }
  }

  changeButton2 = () => {
    this.setState({buttonChange: false})
    clearInterval(this.timerId)
  }

  decrement = () => {
    const {buttonChange, minutes} = this.state
    if (!buttonChange) {
      if (minutes > 1) {
        this.setState(prevState => ({
          minutes: prevState.minutes - 1,
          newMinute:
            prevState.seconds === 0
              ? prevState.newMinute - 1
              : prevState.newMinute,
        }))
      }
    }
  }

  increment = () => {
    const {buttonChange} = this.state
    if (!buttonChange) {
      this.setState(prevState => ({
        minutes: prevState.minutes + 1,
        newMinute:
          prevState.seconds === 0
            ? prevState.newMinute + 1
            : prevState.newMinute,
      }))
    }
  }

  timerReset = () => {
    clearInterval(this.timerId)
    this.setState({buttonChange: false, seconds: 0, newMinute: 25, minutes: 25})
  }

  render() {
    const {buttonChange, seconds, minutes} = this.state
    let {newMinute} = this.state
    if (!buttonChange && seconds === 0) {
      newMinute = minutes
    }
    const result =
      seconds > 9 ? `${newMinute}:${seconds}` : `${newMinute}:0${seconds}`
    const status = buttonChange ? 'Running' : 'Paused'
    return (
      <div className="main-container">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="sub-container">
          <div className="round-div">
            <div className="content-div">
              <h1 className="color-text">{result}</h1>
              <p className="status">{status}</p>
            </div>
          </div>
          <div className="side-div">
            <div className="start-reset">
              {!buttonChange && (
                <div className="start">
                  <button
                    type="button"
                    className="btn"
                    onClick={this.changeButton1}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                      className="icon"
                      alt="play icon"
                    />
                    Start
                  </button>
                </div>
              )}
              {buttonChange && (
                <div className="start">
                  <button
                    type="button"
                    className="btn"
                    onClick={this.changeButton2}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                      className="icon"
                      alt="pause icon"
                    />
                    Pause
                  </button>
                </div>
              )}

              <div className="start">
                <button type="button" className="btn" onClick={this.timerReset}>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    className="icon"
                    alt="reset icon"
                  />
                  Reset
                </button>
              </div>
            </div>
            <p className="set-limit">Set Timer limit</p>
            <div className="limit-setter">
              <button
                type="button"
                className="set-button"
                onClick={this.decrement}
              >
                -
              </button>
              <p className="time-set">{minutes}</p>
              <button
                type="button"
                className="set-button"
                onClick={this.increment}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
