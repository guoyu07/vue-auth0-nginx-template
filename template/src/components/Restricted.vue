<template>
  <div class="">
    <h1>Restricted Area!</h1>
  </div>
</template>

<script>
import auth from '../auth'
export default {
  data() {
    return {}
  },
  route: {
    // Check the users auth status before
    // allowing navigation to the route
    canActivate() {
      return auth.user.authenticated
    }
  }
}
</script>
