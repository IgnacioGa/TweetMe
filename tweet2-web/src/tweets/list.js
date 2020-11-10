import React, {useEffect, useState} from "react"
import { apiTweetList} from "./Lookup"
import {Tweet} from "./detail"

export  function TweetList(props) {
    const [tweetsInit, setTweetsInit] = useState ([])
    const [tweets, setTweets] = useState([])
    const [nextUrl, setnextUrl] = useState(null)
    const [tweetsDidSet, setTweetsDidSet] = useState(false)
    // setTweetsInit([...props.newTweets].concat(tweetsInit))
    
    useEffect (() => {
      const final = [...props.newTweets].concat(tweetsInit)
      if (final.length !== tweets.length) {
        setTweets(final)
      }    
    }, [props.newTweets,tweets, tweetsInit])


    useEffect(() => {
      if (tweetsDidSet === false){
        const handleTweetListLookup = (response, status) => {
          if (status === 200){
            setnextUrl(response.next)
            setTweetsInit(response.results)
            setTweetsDidSet(true)
          }else {
            alert("There was an error in the connection")
          }
      }
      apiTweetList(props.username, handleTweetListLookup)
      }
      
  }, [tweetsInit, tweetsDidSet, setTweetsDidSet, props.username])

  const handleDidReTweet = (newTweet) => {
    const updateTweetsInit = [...tweetsInit]
    updateTweetsInit.unshift(newTweet)
    setTweetsInit(updateTweetsInit)
    const updateFinalTweets = [...tweets]
    updateFinalTweets.unshift(newTweet)
    setTweets(updateFinalTweets)
  }

  const handleLoadNext = (event) => {
    event.preventDefault()
    if (nextUrl !== null){
      const handleNextResponse = (response, status) => {
        if (status === 200){
          setnextUrl(response.next)
          const newTweets = [...tweets].concat(response.results)
          setTweetsInit(newTweets)
          setTweets(newTweets)
        }else {
          alert("There was an error in the connection")
        }
      }
      apiTweetList(props.username, handleNextResponse, nextUrl)
    }
  }

  return <React.Fragment>{tweets.map((item, index)=>{
    return <Tweet tweet={item} didRetweet={handleDidReTweet} key={`${index} - item.id`} className='my-5 py-5 border bg-white text-dark'/>
  })}
  {nextUrl !== null && <button onClick={handleLoadNext} className='btn btn-outline-primary'>Load Next</button>}
  </React.Fragment>
  }