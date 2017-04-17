export default {
  capitalizeTitle (str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  },

  handleRedirect (router, redirect) {
    // Redirect to a specified route
    if (redirect.substr(0, 4) === 'http') {
      window.location = redirect
    } else {
      router.push(redirect)
    }
  },

  validateEmail (email) {
    return /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/.test(email)
  },

  validatePassword (password1, password2) {
    return password1 === password2
  }
}
