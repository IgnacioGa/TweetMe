import React from "react"
import {apiTweetCreate} from "./Lookup"

export function TweetCreate (props) {
  const textAreaRef = React.createRef()
  const {didTweet} = props

    const handleBackendUpdate = (response, status) => {
      if (status === 201) {
        didTweet(response)
      } else {            
        console.log(response)
        alert("An error ocurred, please try again")
      }
    }

    const handleSubmit = (event) => {
      // backend API request
        event.preventDefault()
        const newValue = textAreaRef.current.value       
        apiTweetCreate(newValue, handleBackendUpdate)            
        textAreaRef.current.value = ''
    }
    return <div className={props.className}>
                <form onSubmit={handleSubmit}>
                    <textarea ref={textAreaRef} required={true} className='form-control' name='tweet'>

                    </textarea>
                    <button type='submit' className='btn btn-primary my-3'>Tweet</button>
                </form>
            </div>
}

  