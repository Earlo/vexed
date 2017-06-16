import React, {Component} from 'react'
import './App.css'

import {getCountries, getFlag} from './ducks/api-requests'
import {getCountriesCount} from './ducks/rounds'
import {RadioPads} from './components/Radio-pads'
// this is a little helper you can use if you like, or erase and make your own
const renderCurrentMessage = (  // eslint-disable-line no-unused-vars
  seconds,
  stoppedTime,
  round
) => {
  const {active, isCorrect, started} = round
  const showWelcomeMessage = !started && !active
  const showStartMessage = stoppedTime === null && active
  const showSuccessMessage = stoppedTime > 0 && isCorrect
  const showMistakeMessage = stoppedTime > 0 && !isCorrect

  let message = <span>Oops, time expired</span>

  if (showWelcomeMessage) {
    message = <span>Welcome. Ready to get vexed?</span>
  } else if (showStartMessage) {
    message = <span>Time remaining: {seconds}</span>
  } else if (showSuccessMessage) {
    message = (
      <span>Good job! Answered in {10 - stoppedTime} {seconds === 1 ? 'second' : 'seconds'}</span>
    )
  } else if (showMistakeMessage) {
    message = <span>Wrong answer. Keep studying!</span>
  }
  return <div className='messages-text'>{message}</div>
}

class App extends Component {
  state = {countries:{},
  flags:{},
  countryOptions:false,
  flag:{},
  correct:-1,
  resultMessage:"Select country",
  roundOver:false}

  handleClick = (clickValue) => {
    const {correct, countryOptions} = this.state
    this.setState({resultMessage:countryOptions[correct].code == clickValue?"correct":"wrong"})
    this.setState({roundOver:true})
  }

  componentDidMount(){
    getCountries().then(response=>{
      this.setState({countries:response.data})

      const selectedCountries = getCountriesCount(response.data,3)
      this.setState({countryOptions:selectedCountries})
      this.setState({correct:0})
      /*
      const countryId = selectedCountries[0].code
      getFlag(countryId).then(flagResponse=>{
        this.setState({flag:flagResponse})
      })
      */
    })
  }

  render() {
    const {resultMessage, countryOptions, flag, roundOver} = this.state

    return (
      <div className='App'>

        <div className='App-header'>
          <i className='fa fa-flag-o' aria-hidden='true' />
          <h1>Vexed</h1>
          <h4>
            A game to improve your vexillogical knowledge
          </h4>
        </div>

        <nav><h4 style={{color: '#fff'}}>Cool nav bar here</h4></nav>

        <main>
          {resultMessage}
          {countryOptions&&
          <img src={`flags/${Array.from(countryOptions)[0].code.toLowerCase()}.png`}/>
          }
          <RadioPads
          options={Array.from(countryOptions).map((country)=>{return country.choice})}
          handleSelection={this.handleClick}
          disabled={roundOver}
          >
          </RadioPads>
        </main>
      </div>
    )
  }
}

App.propTypes = {}

export default App
