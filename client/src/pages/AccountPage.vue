<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>


  <!-- NOTE: IMPORTANT: the reason this wasn't working, and the reason I was failing one of those postman tests after it passed for a while, is because I had bad data in my DB. In my DB, I must have had ticket data where I had populated this data before I fixed my populates. This caused tickets to be present that did not have events attached to them. This made it so they test started to fail, and made it so I couldn't populate the different events for the corresponding tickets on my account page.  -->

    <section class="row justify-content-center">
      <h3>Events you have tickets for:</h3>
      <!-- NOTE: the :comment='comment', this is our props that we are passing to our component -->
      <div v-for="ticket in myTickets" :key="ticket.id" class="col-10 col-md-7 elevation-2 m-2 p-2 bg-dark rounded">
        <EventCard :event="ticket.event"/>
      </div>
    </section>



</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import Pop from "../utils/Pop.js";
import { accountService } from "../services/AccountService.js";
import { eventsService } from "../services/EventsService.js";
import { logger } from "../utils/Logger.js";
export default {
  setup() {
    onMounted(()=> getTicketsByAccount());
    onMounted(() => getEvents());
    async function getEvents() {
      try {
        await eventsService.getEvents()
      } catch (error) {
        Pop.error(error)
      }
    }
    async function getTicketsByAccount(){
      try {
        const userId = AppState.account.id
        await accountService.getTicketsByAccount(userId)
        logger.log('here are the tickets we got:', AppState.accountTickets)
      } catch (error) {
        Pop.error(error)
      }
    }
    return {
      account: computed(() => AppState.account),
      myTickets: computed(()=> AppState.accountTickets),
      events: computed(()=> AppState.events)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
