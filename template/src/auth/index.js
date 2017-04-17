/* global sessionStorage */
import {router} from '../index.js'
import Utils from '../utils.js'

const AUTH_KEY = '{{ auth_key }}'
const API_URL = '{{ api_url }}'
const LOGIN_URL = API_URL + '/oauth/token'
const SIGNUP_URL = API_URL + '/signup'
const CHANGE_PASSWORD_URL = API_URL + '/change_password'

const HEADERS = {
  'Content-Type': 'application/json'
}

export default {
  // User object will let us check authentication status
  user: {
    authenticated: false
  },

  // Send a request to the login URL and save the returned JWT
  login (context, body, redirect) {
    body['audience'] = '{{ audience }}'
    body['grant_type'] = 'password'
    {{#refresh_token}}
    body['scope'] = 'offline_access'
    {{/refresh_token}}

    context.$http.post(LOGIN_URL, body, HEADERS).then(goodRes => {
      sessionStorage.setItem(AUTH_KEY, JSON.stringify(goodRes.body))

      this.user.authenticated = true
      Utils.handleRedirect(router, redirect)
    }, badRes => {
      const status = badRes.status
      if (status >= 400) {
        if (status === 403) {
          context.error = 'Username and/or password invalid'
        } else if (status === 429) {
          context.error = 'Too many login attempts. Please contact our team for help.'
        } else {
          context.error = 'Login failed. Please contact our team for help if it persists.'
        }
      }
    })
  },

  signup (context, body, redirect) {
    context.$http.post(SIGNUP_URL, body, HEADERS).then(goodRes => {
      Utils.handleRedirect(router, redirect)
    }, badRes => {
      const rbody = badRes.body
      const msg = rbody.error || rbody.message || rbody.description
      context.error = Utils.capitalizeTitle(msg)
    })
  },

  changePassword (context, body) {
    context.$http.post(CHANGE_PASSWORD_URL, body, HEADERS).then(goodRes => {
      context.success = Utils.capitalizeTitle(goodRes.body)
      context.error = ''
    }, badRes => {
      const rbody = badRes.body
      const msg = rbody.error || rbody.message || rbody.description
      context.error = Utils.capitalizeTitle(msg)
      context.success = ''
    })
  },

  // To log out, we just need to remove the token
  logout () {
    sessionStorage.removeItem(AUTH_KEY)
    this.user.authenticated = false
  },

  checkAuth () {
    const jwt = sessionStorage.getItem(AUTH_KEY)
    if (jwt) {
      this.user.authenticated = true
    } else {
      this.user.authenticated = false
    }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader () {
    const auth = JSON.parse(sessionStorage.getItem(AUTH_KEY))
    return {
      'Authorization': 'Bearer ' + auth['access_token']
    }
  }
}
