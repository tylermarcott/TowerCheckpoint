
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
        <h5>{{ event?.location }}, {{ event?.startDate }}</h5>
      </div>
      <div class="row text-center m-2">
        <p>{{ event?.description }}</p>
      </div>
      <div class="row mt-5 ms-2">
        <div class="col-6">
          <h5>Tickets Left: {{ event?.capacity - event?.ticketCount }}</h5>
        </div>


        <!-- STUB: create ticket stub -->

        <div class="col-6 text-center">
          <!-- TODO: make syntax for creating a ticket for a user when they click attend -->
          <!-- <button @click="createTicket" v-if="!((event?.capacity - event?.ticketCount) == 0)" class="btn btn-warning">Attend</button> -->

          <button v-if="!isAttending && user.isAuthenticated" @click="createTicket" role="button" class="btn btn-warning"><i class="mdi mdi-plus"></i> Purchase Ticket</button>
          <button v-else-if="user.isAuthenticated" @click="deleteTicket" role="button" class="btn btn-danger"><i class="mdi mdi-minus"></i> Return Ticket</button>
          <button v-else role="button" class="btn btn-dark">Log in to purchase ticket!</button>
          <h3 class="sold-out" v-if="(event?.capacity - event?.ticketCount) == 0">SOLD OUT</h3>

          <button @click="cancelEvent" class="btn btn-danger" v-if="event?.creatorId == account.id">Cancel Event</button>
        </div>
      </div>
    </div>
  </div>

  <!-- FIXME: make sure this is passing the right key, might need to be the event id? -->

  <!-- <div v-for="comment in comments" :key="comment">
    <CommentCard :comment="comment"/>
  </div> -->

  <!-- TODO: have to create form to create comments here -->

  <section>
    <form class="m-2 p-2" @submit.prevent="createComment">
      <div class="mb-3">
        <label for="commentData-body" class="form-label">Comment</label>
        <textarea v-model="commentData.body" class="form-control" id="comment-body" rows="6"></textarea>
      </div>
      <div class="form-check mb-3">
        <input v-model="commentData.isAttending" class="form-check-input" type="checkbox" value="" id="comment-isAttending">
        <label class="form-check-label" for="flexCheckDefault">
          Attending event?
        </label>
      </div>
      <button class="btn btn-dark">Submit</button>
    </form>
  </section>





<!-- TODO: let's do a raw data dump of the comments here first to show we can get comments to the page -->

</section>

</template>

<script>
import { computed, onMounted, watchEffect } from "vue";
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js";
// import { logger } from "../utils/Logger.js";
import {AppState} from "../AppState.js"
import { logger } from "../utils/Logger.js";
import {commentsService} from "../services/CommentsService.js"
import { ref } from "vue";
import {ticketsService} from '../services/TicketsService.js'

export default {
setup() {
  const commentData = ({ref})
  const route = useRoute()
  watchEffect(()=> {
    getEventById();
    getTicketsByEventId();
  })
  onMounted(()=> getCommentsByEvent())

  async function getEventById(){
    try {
      await eventsService.getEventById(route.params.eventId)
    } catch (error) {
      Pop.error(error)
    }
  }

  async function getCommentsByEvent(){
    try {
      await commentsService.getCommentsByEvent(route.params.eventId)
    } catch (error) {
      Pop.error(error)
    }
  }

  async function getTicketsByEventId(){
    try {
      await eventsService.getTicketsByEventId(route.params.eventId)
    } catch (error) {
      Pop.error(error)
    }
  }

  return {
    commentData,
    event: computed(()=> AppState.activeEvent),
    user: computed(()=> AppState.user),
    account: computed(()=> AppState.account),
    isAttending: computed(()=> AppState.activeEventTickets.find(ticket => ticket.accountId == AppState.account.id)),


    // TODO: have to change the raw data dump time to a specified time

    async cancelEvent(){
      try {
        logger.log('here is our active event id:', AppState.activeEvent.id)
        const cancelledEvent = await eventsService.cancelEvent(AppState.activeEvent.id)
        return cancelledEvent
      } catch (error) {
        Pop.error(error)
      }
    },

    // TODO: what do I need to create this comment? I need the form data, and I need the id of the person who is creating it. In this case, that will be whoever is logged in, so user.id?
    async createComment(){
      try {
        // FIXME: commentData is undefined
        logger.log('here is our form data:', commentData.value)
        await commentsService.createComment(commentData.value, AppState.account.id)
      } catch (error) {
        Pop.error(error)
      }
    },

    async createTicket(){
      try {
        let ticketData = {eventId: route.params.eventId} // just creating a body with the eventId on it = to param route
        await ticketsService.createTicket(ticketData)


        // FIXME: this works, but a user shouldn't be able to purchase more than one ticket to a specific event
        AppState.activeEvent.capacity--
      } catch (error) {
        Pop.error(error)
      }
    },

    async deleteTicket(){
      try {
        let ticket = AppState.activeEventTickets.find(ticket => ticket.accountId == AppState.account.id)

        logger.log('found ticket with the following id:', ticket.id)

        await ticketsService.deleteTicket(ticket.id)

        AppState.activeEvent.capacity++
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