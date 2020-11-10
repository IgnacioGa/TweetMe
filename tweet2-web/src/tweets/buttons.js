import React from "react"
import {apiTweetAction} from "./Lookup"


export function ActionBTN (props) {
    const {tweet, action, didPerformAction} = props
    const likes = tweet.likes ? tweet.likes : 0
    const ClassName = props.className ? props.className : 'btn btn-primary btn-sm'
    const actionDisplay = action.display ? action.display : 'Action'

    const handleActionBackendEvent = (response, status) => {
      console.log(response, status)
      if ((status === 200 || status === 201) && didPerformAction) {
        didPerformAction(response, status)
      }
    }

    const handleCLick = (event) => {
        event.preventDefault()
        apiTweetAction(tweet.id, action.type, handleActionBackendEvent)
        
    }
    const display = action.type === 'like' ?  `${likes} ${actionDisplay}` : actionDisplay
    return <button className={ClassName} onClick={handleCLick}>{display}</button>
  }