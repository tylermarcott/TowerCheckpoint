<template>
  <header class="secondary-background">
    <Navbar />
  </header>
  <main class="background">
    <router-view />
  </main>
   <footer class="secondary-background text-light">
    Come to us for all of your event needs!
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
}

.background{
  background-color: #6d6b94;
}

.secondary-background{
background-color: #92946B;
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
