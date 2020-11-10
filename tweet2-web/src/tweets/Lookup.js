import {BackendLookup} from '../lookup'

export function apiTweetFeed(callBack, nextUrl) {
  let endpoint = "/tweets/feed"
  if (nextUrl !== null && nextUrl !== undefined){
    endpoint = nextUrl.replace("http://localhost:8000/api", "")
  }
  BackendLookup("GET",endpoint , callBack)    
}

export function apiTweetCreate(newTweet, callback){
    BackendLookup("POST", "/tweets/create", callback, {content: newTweet})
  }

  export function apiTweetAction(tweetId, action, callback){
    const data = {id: tweetId, action: action}
    BackendLookup("POST", "/tweets/action", callback, data)
  }
  
  export function apiTweetDetail(tweetId, callBack) {
      BackendLookup("GET", `/tweets/${tweetId}` , callBack)    
  }

export function apiTweetList(username, callBack, nextUrl) {
  let endpoint = "/tweets/"
  if (username){
    endpoint = `/tweets/?username=${username}`
  }
  if (nextUrl !== null && nextUrl !== undefined){
    endpoint = nextUrl.replace("http://localhost:8000/api", "")
  }
  BackendLookup("GET",endpoint , callBack)    
}