<template>
  <div class="container">
    <form class="row" @submit="createEvent">
      <div>
        <label for="event-name">Event Name</label>
        <input v-model="eventData.name" type="text" required="true" placeholder="event name" >
      </div>
    </form>
  </div>
</template>

<script>

import { ref } from "vue";

export default {
setup() {
  const eventData = ref({})
  return {

    async createEvent(){

    }

  };
},
};
</script>


<style>
</style>