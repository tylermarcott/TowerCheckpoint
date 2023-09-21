<template>
  <div class="container">
    <form class="row" @submit.prevent="createEvent">
      <div class="col-12">
        <label for="event-name">Name</label>
        <input v-model="eventData.name" class="form-control" type="text" required="true" placeholder="event name" >
      </div>
      <div class="col-12">
        <label for="event-description">Description</label>
        <input v-model="eventData.description" class="form-control" type="text" columns="3" required="true" placeholder="event description">
      </div>
      <div class="col-12">
        <label for="event-coverImg">Cover Image</label>
        <input v-model="eventData.coverImg" class="form-control" type="url" required="true" placeholder="event coverImg">
      </div>
      <div class="col-12">
        <label for="event-type">Type</label>
        <select v-model="eventData.type" class="form-control" id="event-type" required="true">
          <option value="concert">concert</option>
          <option value="convention">convention</option>
          <option value="sports">sports</option>
          <option value="digital">digital</option>
        </select>
      </div>
      <div class="col-12">
        <label for="event-location">Location</label>
        <input v-model="eventData.location" required="true" class="form-control" type="text" placeholder="event location">
      </div>

      <div class="col-12">
        <label for="event-startDate">Start Date</label>
        <input v-model="eventData.startDate" required="true" class="form-control" type="date" placeholder="event startDate">
      </div>

      <div class="col-12">
        <label for="event-capacity">Capacity</label>
        <input v-model="eventData.capacity" required="true" class="form-control" type="number" placeholder="event capacity">
      </div>

      <button class="btn btn-dark mt-2">Submit</button>

    </form>
  </div>
</template>

<script>

import { ref } from "vue";
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js";
import { logger } from "../utils/Logger.js";
import { Modal } from "bootstrap";
import { router } from "../router.js";

export default {
setup() {
  // NOTE: you have to push this into your brain. The only thing that a ref does is act as an object that is a placeholder to put the data that is submitted from our form. This data is then passed to the create to create a new event
  const eventData = ref({});
  function resetForm(){
    eventData.value = {type: ''}
  }
  return {
    // NOTE: remember you have to return the ref so that it can be referenced in your html
    eventData,
    async createEvent(){
      try {
        let newEvent = await eventsService.createEvent(eventData.value)
        logger.log('creating event with the following data:', eventData.value)
        Pop.toast('Event Created!', 'success')
        resetForm()
        // Modal.getOrCreateInstance('#create-event').hide()
        // FIXME: issue with id here
        router.push({name: 'Event Details', params: {eventId: newEvent.id}})

        // TODO: finish more syntax here after you get your create done.

      } catch (error) {
        Pop.error(error)
      }
    }

  };
},
};
</script>


<style>
</style>