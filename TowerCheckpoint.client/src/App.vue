<template>
  <header class="secondary-background">
    <Navbar />
  </header>
  <main class="background p-3">
    <router-view />
  </main>
   <footer class="secondary-background text-black fs-5 d-flex align-items-center text-center">
    <i class="mdi mdi-shimmer icon"></i>
    <h5 class="mt-2 mx-1">Coming to us with your event needs is an EVENT-uality!</h5>
    <i class="mdi mdi-shimmer icon"></i>
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
  background-color: #DBD3AD;
}

.secondary-background{
background-color: #92946B;
}

.icon{
  color: gold;
}

footer {
  display: grid;
  place-content: center;
  height: 3em;
}
</style>
