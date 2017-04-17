<template>
  <div class="col-sm-4 col-sm-offset-4">
    <h2>Sign Up</h2>
    <p>Sign up to get some great data.</p>
    <div class="alert alert-danger" v-if="error">
      <p>\{{ error }}</p>
    </div>
    <div class="form-group">
      <input
        autofocus
        type="text"
        class="form-control"
        placeholder="Enter your email"
        v-on:keyup.enter="submit"
        v-model="credentials.email">
    </div>
    <div class="form-group">
      <input
        type="password"
        class="form-control"
        placeholder="Enter your password"
        v-on:keyup.enter="submit"
        v-model="credentials.password">
    </div>
    <button
      class="btn btn-primary"
      v-on:click="submit">Sign Up</button>
  </div>
</template>

<script>
import Utils from '../utils'
import auth from '../auth'
export default {
  data() {
    return {
      // We need to initialize the component with any
      // properties that will be used in it
      credentials: {
        email: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    submit() {
      const credentials = {
        email: this.credentials.email,
        password: this.credentials.password
      }

      if (!credentials.email) {
        this.error = 'Email required'
        return
      } else if (!credentials.password) {
        this.error = 'Password required'
        return
      }

      if (!Utils.validateEmail(credentials.email)) {
        this.error = 'Valid email required'
        return
      }
      // We need to pass the component's this context
      // to properly make use of http in the auth service
      auth.signup(this, credentials, 'login')
    }
  }
}
</script>
