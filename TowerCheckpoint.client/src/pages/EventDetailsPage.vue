<template>
<section class="container">
  <div class="row justify-content-center">
    <div class="col-8 d-flex justify-content-center elevation-2 bg-light">
      <img class="img" :src="event.coverImg" :alt="event.name">
    </div>
  </div>
  <div class="row justify-content-center">
    <div class="col-10 details-card elevation-2 bg-light">
      <div class="row text-center m-2">
        <h3>{{ event.name }}</h3>
      </div>
      <div class="row text-center m-2">
        <h5>{{ event.location }}</h5>
      </div>
      <div class="row text-center m-2">
        <p>{{ event.description }}</p>
      </div>
      <div class="row mt-5 ms-2">
        <div class="col-6">
          <h5>Tickets Left: {{ event.capacity - event.ticketCount }}</h5>
        </div>
        <div class="col-6 text-center">
          <!-- TODO: create syntax on this button to make it grayed out if there are no tickets left or if event is cancelled -->
          <button class="btn btn-warning">Attend</button>
          <!-- TODO: check and see if this sold out button works properly -->
          <h3 class="sold-out" v-if="(event.capacity - event.ticketCount) == 0">SOLD OUT</h3>
        </div>
      </div>
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

.details-card{
  min-height: 30vh;
  min-width: 120vh;
  border-radius: 5px;
}

.sold-out{
  color:black;
  background-color: red;
  border-radius: 14px;
}
</style>