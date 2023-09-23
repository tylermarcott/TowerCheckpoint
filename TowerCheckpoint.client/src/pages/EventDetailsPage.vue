
<template>
<section class="container">
  <div class="row justify-content-center mb-5">
    <div class="col-8 d-flex justify-content-center elevation-2 bg-light">
      <!-- NOTE: do not forget to use the elvis operator OR a v-if statement to compensate for conditions where activeEvent is null. If you don't do this, you will get errors saying can't read properties of undefined or something similar. -->
      <!-- FIXME: have sold out displayed for when it's canceled. Display 2 different images for if it's cancelled or if it's sold out -->
      <img v-if="event?.isCanceled || ((event?.capacity - event?.ticketCount) == 0)" src="https://pngimg.com/d/sold_out_PNG61.png" alt="">
      <img v-if="!(event?.isCanceled || ((event?.capacity - event?.ticketCount) == 0))" class="img" :src="event?.coverImg" :alt="event?.name">
    </div>
  </div>

  <!-- TODO: have to create a v-for for the different tickets, and have users who are attending the event's pictures displayed -->
  <div class="col-12 card">
    People with tickets:
    <div class="row">
      <div class="col-1">
        <img v-on:mouseover="name" class="profile-img" v-for="ticket in tickets" :key="ticket.id" :src="ticket.profile.picture" alt="">
        <img/>
      </div>
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



          <!-- TODO: ok, so what do I want for the attend button which creates a ticket? I want it to be shown if there is no ticket on the user account for this event. I want it hidden if the event is sold out, canceled or the user already has a ticket to the event.  -->

          <button @click="createTicket" v-if="user.isAuthenticated && !isAttending && (ticketTotal != 0) && !event?.isCanceled" class="btn btn-warning"><i class="mdi mdi-plus"></i> Purchase Ticket</button>

          <button v-if="user.isAuthenticated && !event?.isCanceled && isAttending" @click="deleteTicket" role="button" class="btn btn-danger"><i class="mdi mdi-minus"></i> Return Ticket</button>




          <!-- <button class="btn btn danger" v-else-if="event?.isCanceled">EVENT CANCELED</button>
          <button class="sold-out" v-else-if="((event?.capacity - event?.ticketCount) == 0)">SOLD OUT</button>
          <button v-else role="button" class="btn btn-dark">Log in to purchase ticket!</button>

          <button v--if="user.isAuthenticated && !event?.isCanceled && !((event?.capacity - event?.ticketCount) == 0)" @click="deleteTicket" role="button" class="btn btn-danger"><i class="mdi mdi-minus"></i> Return Ticket</button> -->
          
          <!-- FIXME: the only issue on this is that when the event is canceled, still have option to return ticket. -->

          <button @click="cancelEvent" class="btn btn-danger" v-if="(event?.creatorId == account.id) && !event?.isCanceled">Cancel Event</button>
        </div>
      </div>
    </div>
  </div>


  <!-- TODO: have to create form to create comments here -->

  <!-- FIXME: getting commentData.value back as undefined, so having an issue with getting data from the form -->

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

  <!-- STUB: comments section -->
  <!-- TODO: LEAVE OFF HERE. Have to make this look prettier and comments should be done. Then I need to move on to the profile page and populate which events you have tickets to. -->
  <section class="row justify-content-center">
    <!-- NOTE: the :comment='comment', this is our props that we are passing to our component -->
    <div v-for="comment in comments" :key="comment.id" class="col-12 col-md-10 elevation-2 m-2 p-2">
      <CommentCard :comment="comment"/>
    </div>
  </section>

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
  const commentData = ref({})
  const route = useRoute()
  watchEffect(()=> {
    getEventById();
    getTicketsByEventId();
    getCommentsByEventId();
  })
  onMounted(()=> getCommentsByEventId())

  async function getEventById(){
    try {
      await eventsService.getEventById(route.params.eventId)
    } catch (error) {
      Pop.error(error)
    }
  }


  // FIXME: comments not reactively pushing to the bottom of the comment list.... fix
  async function getCommentsByEventId(){
    try {
      await eventsService.getCommentsByEventId(route.params.eventId)
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
    ticketTotal: computed(()=> (AppState.activeEvent.capacity - AppState.activeEvent.ticketCount)),
    event: computed(()=> AppState.activeEvent),
    user: computed(()=> AppState.user),
    account: computed(()=> AppState.account),
    tickets: computed(()=> AppState.activeEventTickets),
    comments: computed(()=> AppState.activeComments),
    isAttending: computed(()=> AppState.activeEventTickets.find(ticket => ticket.accountId == AppState.account.id)),


    // TODO: have to change the raw data dump time to a specified time

    async cancelEvent(){
      try {
        const cancelledEvent = await eventsService.cancelEvent(AppState.activeEvent.id)
        return cancelledEvent
      } catch (error) {
        Pop.error(error)
      }
    },

    // TODO: what do I need to create this comment? I need the form data, and I need the id of the person who is creating it. In this case, that will be whoever is logged in, so user.id?
    async createComment(){
      try {
        commentData.value.eventId = route.params.eventId
        await commentsService.createComment(commentData.value)
        Pop.toast('Comment created', 'success')
      } catch (error) {
        Pop.error(error)
      }
    },

    async createTicket(){
      try {
        let ticketData = {eventId: route.params.eventId} // just creating a body with the eventId on it = to param route
        await ticketsService.createTicket(ticketData)
        AppState.activeEvent.capacity--
      } catch (error) {
        Pop.error(error)
      }
    },

    async deleteTicket(){
      try {
        let ticket = AppState.activeEventTickets.find(ticket => ticket.accountId == AppState.account.id)
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

.profile-img{
  border-radius: 50%;
  max-width: 5vh;
  max-width: 5vh;
  object-fit: cover;
  object-position: center;
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