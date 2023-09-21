
<template>
<section class="container">
  <div class="row justify-content-center mb-5">
    <div class="col-8 d-flex justify-content-center elevation-2 bg-light">
      <!-- NOTE: do not forget to use the elvis operator OR a v-if statement to compensate for conditions where activeEvent is null. If you don't do this, you will get errors saying can't read properties of undefined or something similar. -->
      <img v-if="event?.isCanceled || ((event?.capacity - event?.ticketCount) == 0)" src="https://pngimg.com/d/sold_out_PNG61.png" alt="">
      <img v-if="!(event?.isCanceled || ((event?.capacity - event?.ticketCount) == 0))" class="img" :src="event?.coverImg" :alt="event?.name">
    </div>
  </div>
  <div class="row justify-content-center">
    <div class="col-10 details-card elevation-2 bg-light">
      <div class="row text-center m-2">
        <h3>{{ event?.name }}</h3>
      </div>
      <div class="row text-center m-2">
        <h5>{{ event?.location }}</h5>
      </div>
      <div class="row text-center m-2">
        <p>{{ event?.description }}</p>
      </div>
      <div class="row mt-5 ms-2">
        <div class="col-6">
          <h5>Tickets Left: {{ event?.capacity - event?.ticketCount }}</h5>
        </div>
        <div class="col-6 text-center">
          
          <button v-if="!((event?.capacity - event?.ticketCount) == 0)" class="btn btn-warning">Attend</button>

          <h3 class="sold-out" v-if="(event?.capacity - event?.ticketCount) == 0">SOLD OUT</h3>

          <button @click="cancelEvent" class="btn btn-danger" v-if="event?.creatorId == account.id">Cancel Event</button>
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
import { logger } from "../utils/Logger.js";

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
    event: computed(()=> AppState.activeEvent),
    user: computed(()=> AppState.user),
    account: computed(()=> AppState.account),

    async cancelEvent(){
      try {

        // TODO: come back and finish this cancel event function.

        logger.log('here is our active event id:', AppState.activeEvent.id)
        const cancelledEvent = await eventsService.cancelEvent(AppState.activeEvent.id)
      } catch (error) {
        Pop.error(error)
      }
    }
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