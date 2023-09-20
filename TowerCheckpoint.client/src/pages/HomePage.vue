<template>
  <section class="container">
    <div class="row">
      <div v-for="event in events" :key="event.id" class="col-6 g-3">
        <EventCard :event="event"/>
      </div>
    </div>
  </section>
</template>

<script>
import Pop from "../utils/Pop.js";
import {eventsService} from "../services/EventsService.js"
import { onMounted, computed } from "vue";
import {AppState} from "../AppState.js"
import EventCard from "../components/EventCard.vue"

export default {
  setup() {
    onMounted(()=> getEvents());
    async function getEvents(){
      try {
        await eventsService.getEvents()
      } catch (error) {
        Pop.error(error)
      }
    }
    return {
      events: computed(()=> AppState.events)
    }
  },
  component: {EventCard}
}
</script>

<style scoped lang="scss">

</style>
