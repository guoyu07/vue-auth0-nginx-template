<template>
  <div class="col-sm-4 col-sm-offset-4">
    <h2>Change Password</h2>
    <p>Change your password to get some great data.</p>
    <div class="alert alert-danger" v-if="error">
      <p>\{{ error }}</p>
    </div>
    <div class="alert alert-success" v-if="success">
      <p>\{{ success }}</p>
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
    <button
      class="btn btn-primary"
      v-on:click="submit">Change Password</button>
  </div>
</template>

<script>
import auth from '../auth'
export default {
  data() {
    return {
      credentials: {
        email: ''
      },
      error: '',
      success: ''
    }
  },
  methods: {
    submit() {
      const credentials = {
        email: this.credentials.email
      }

      if (!credentials.email) {
        this.error = 'Email required'
        return
      }

      auth.changePassword(this, credentials)
    }
  }
}
</script>
