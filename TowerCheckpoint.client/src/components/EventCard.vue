<template>

<router-link :to="{path: `events/${event.id}`}">
        <div class="elevation-3 desc-card text-center text-light p-2">
          <img class="img" :src="event.coverImg" :alt="event.name">
          <div class="text-center desc-card m-2">
            <h5>{{ event.name }}</h5>
            <div>Ticket left: {{ event.capacity - event.ticketCount }}</div>
          </div>
        </div>
</router-link>
</template>

<script>
import { Event } from "../models/Event.js"; //NOTE: have to import your Event class for your props, or Event is just treated like an Object, and will populate an error on console.



export default {
  props: {event: {type: Object || Event, required: true}},   //NOTE: this is necessary for preventing warnings when vue is expecting an object but we try to give it an object of type 'Event' instead
setup() {
  return {
  };
},
};
</script>


<style lang="scss" scoped>

.img{
    object-fit: cover;
    object-position: center;
    height: 50vh;
    max-width: 100%;
    border-radius: 5px;
}

.desc-card{
  background-color: #92946B;
  backdrop-filter: blur;
  border-radius: 5px;
}


</style>