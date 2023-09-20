<template>
<section class="container">
  <div class="row">
    <div class="col-10 ">
      <img class="img" :src="event.coverImg" :alt="event.name">
    </div>
  </div>
</section>

</template>

<script>
import { computed, watchEffect } from "vue";
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js";
// import { logger } from "../utils/Logger.js";
import {AppState} from "../AppState.js"

export default {
setup() {
  const route = useRoute()
  watchEffect(()=> {
    getEventById();
  })

  async function getEventById(){
    try {
      await eventsService.getEventById(route.params.eventId)
    } catch (error) {
      Pop.error(error)
    }
  }

  return {
    event: computed(()=> AppState.activeEvent)
  };
},
};
</script>


<style>
.img{
    object-fit: cover;
    object-position: center;
    max-height: 50vh;
    max-width: 100%
}
</style>