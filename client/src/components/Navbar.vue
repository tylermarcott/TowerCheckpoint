<template>
  <nav class="navbar navbar-expand-lg navbar-dark px-3">
      <div class="title">_Towers</div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          <router-link :to="{ name: 'Home' }" class="btn text-black lighten-30 selectable text-uppercase mb-1">
            Home
          </router-link>
        </li>
      </ul>

      <div class="me-2">
        <ModalWrapper id="create-event" v-if="user.isAuthenticated">
          <template #button>
            <i class="mdi mdi-plus">Create Event</i>
          </template>
          <template #body>
            <EventForm/>
          </template>
        </ModalWrapper>
      </div>
      <Login />
    </div>
  </nav>
</template>

<script>
import { computed } from "vue";
import Login from './Login.vue';
import { AppState } from "../AppState.js";
import ModalWrapper from './ModalWrapper.vue'
export default {
  setup() {
    return {
      user: computed(()=> AppState.user)
    }
  },
  components: { Login, ModalWrapper }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Caveat&family=Dancing+Script:wght@500&family=Permanent+Marker&display=swap');

.root{
  --primary: #DBD3AD;
  --secondary: #92946B;
  --muted: #C2714F;
  --bright: #E0607E;
  --mellow: #D36060;
  --pale: #F6C5AF;
}

a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.title{
  font-family: 'Caveat', cursive;
  font-size: 50px;
  color: #141313;
  margin-right: 1em;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid #DBD3AD;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
