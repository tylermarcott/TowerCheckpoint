<template>
  <!-- TODO: should probably add a media query here to make the buttons look nicer on mobile. -->
  <section class="container">
<div class="row justify-content-center mt-3">
  <div class="col-4 col-md-2 text-center m-1">
    <button @click="filterBy = ''" class="btn btn-dark">All</button>
  </div>
  <div class="col-4 col-md-2 text-center m-1">
    <button @click="filterBy = 'concert'" class="btn btn-dark">Concert</button>
  </div>
    <div class="col-4 col-md-2 text-center m-1">
    <button @click="filterBy = 'convention'" class="btn btn-dark">Convention</button>
  </div>
    <div class="col-4 col-md-2 text-center m-1">
    <button @click="filterBy = 'sport'" class="btn btn-dark">Sport</button>
  </div>
    <div class="col-4 col-md-2 text-center m-1">
    <button @click="filterBy = 'digital'" class="btn btn-dark">Digital</button>
  </div>
</div>

  </section>

  <section class="container">
    <div class="row">
      <div v-for="event in events" :key="event.id" class="col-12 col-md-6 g-3">
        <EventCard :event="event"/>
      </div>
    </div>
  </section>

  
</template>

<script>
import Pop from "../utils/Pop.js";
import {eventsService} from "../services/EventsService.js"
import { onMounted, computed, ref } from "vue";
import {AppState} from "../AppState.js"
import EventCard from "../components/EventCard.vue"

export default {
  setup() {
    const filterBy = ref('')
    onMounted(()=> getEvents());
    async function getEvents(){
      try {
        await eventsService.getEvents()
      } catch (error) {
        Pop.error(error)
      }
    }
    return {
      filterBy,
      events: computed(()=> {
        if(!filterBy.value){
          return AppState.events
        } else{
          return AppState.events.filter(event => event.type == filterBy.value)
        }
      })
    }
  },
  component: {EventCard}
}
</script>

<style scoped lang="scss">

</style>
