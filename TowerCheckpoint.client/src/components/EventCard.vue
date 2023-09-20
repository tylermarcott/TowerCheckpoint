<template>
    <div class="elevation-3 rounded event-card">
      <img class="img" :src="event.coverImg" :alt="event.name">
      <div class="text-center">
        <h5>{{ event.name }}</h5>
      </div>
    </div>
</template>

<script>
import { Event } from "../models/Event.js"; //NOTE: have to import your Event class for your props, or Event is just treated like an Object, and will populate an error on console.



export default {
  props: {event: {type: Event, required: true}},
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
    max-height: 50vh;
    max-width: 100%
}

.desc-card{
  background-color: #3f3c3c;
  backdrop-filter: blur;
  border-radius: 14px;
}


</style>