import {BackendLookup} from '../lookup'

export function apiProfileDetail(username, callBack) {
    BackendLookup("GET", `/profiles/${username}/` , callBack)    
}

export function apiProfileFollowToggle(username, action, callBack) {
    const data = {action: `${action && action}`.toLowerCase()}
    BackendLookup("POST", `/profiles/${username}/follow` , callBack, data)    
}

