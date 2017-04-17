<template>
  <div class="col-sm-4 col-sm-offset-4">
    <h2>Log In</h2>
    <p>Log in to your account to get some great data.</p>
    <div class="alert alert-danger" v-if="error">
      <p>\{{ error }}</p>
    </div>
    <div class="form-group">
      <input
        autofocus
        type="text"
        class="form-control"
        placeholder="Enter your username"
        v-on:keyup.enter="submit"
        v-model="credentials.username">
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
      v-on:click="submit">Login</button>
  </div>
</template>

<script>
import auth from '../auth'
export default {
  data() {
    return {
      // We need to initialize the component with any
      // properties that will be used in it
      credentials: {
        username: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    submit() {
      const credentials = {
        username: this.credentials.username,
        password: this.credentials.password
      }

      if (!credentials.username) {
        this.error = 'Username required'
        return
      } else if (!credentials.password) {
        this.error = 'Password required'
        return
      }
      // We need to pass the component's this context
      // to properly make use of http in the auth service
      auth.login(this, credentials, '{{ redirect }}')
    }
  }
}
</script>
