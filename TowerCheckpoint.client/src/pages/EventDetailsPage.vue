
<template>
<section v-if="event" class="container">
  <div class="row justify-content-center mb-5">
    <div class="col-12 col-md-8 d-flex justify-content-center elevation-2 img-background">
      <img class="img" v-if="event.isCanceled" src="https://media.istockphoto.com/id/1278420063/vector/cancel-red-ink-stamp.jpg?s=612x612&w=0&k=20&c=ElHKDdD9UnVxJqDLezLRJ7zhRC-hJVdvEFCsnJ9lNb0=" alt="">
      <img class="img" v-else-if="((event.capacity - event.ticketCount) == 0)" src="https://media.istockphoto.com/id/1019461088/vector/sold-out-red-square-grunge-stamp-on-white.jpg?s=612x612&w=0&k=20&c=Q1funtaP0CzqKKU_Okp6QQXGP79-X_cNAYd7trlR5-s=" alt="">
      <img v-if="!(event.isCanceled || ((event.capacity - event.ticketCount) == 0))" class="img" :src="event.coverImg" :alt="event.name">
    </div>
  </div>

  <div class="col-12 ticketholder-card elevation-2">
    <h5>Ticketholders:</h5>
    <div class="row">
      <div class="col-1">
        <img v-on:mouseover="name" class="profile-img" v-for="ticket in tickets" :key="ticket.id" :src="ticket.profile.picture" alt="">
        <img/>
      </div>
    </div>
  </div>

  <div class="row justify-content-center">
    <div class="col-12 col-md-10 details-card elevation-2 bg-light">
      <div class="row text-center m-2">
        <h3>{{ event.name }}</h3>
      </div>
      <div class="row text-center m-2">
        <h5>{{ event.location }}, {{ dateFormat(event.startDate)}}</h5>
      </div>
      <div class="row text-center m-2">
        <div class="col-12">
          <p>{{ event.description }}</p>
        </div>
      </div>
      <div class="row mt-5 ms-2">
        <div class="col-6">
          <h5>Tickets Left: {{ event.capacity - event.ticketCount }}</h5>
        </div>

        <!-- STUB: ticket stub -->

        <div class="col-12 col-md-6 text-center p-2">

          <button @click="createTicket" v-if="user.isAuthenticated && !isAttending && (ticketTotal != 0) && !event?.isCanceled" class="btn btn-warning m-1"><i class="mdi mdi-plus"></i> Purchase Ticket</button>

          <button v-else-if="user.isAuthenticated && !event?.isCanceled && isAttending" @click="deleteTicket" role="button" class="btn btn-danger m-1"><i class="mdi mdi-minus"></i> Return Ticket</button>

          <button class="btn btn-dark" v-else-if="!user.isAuthenticated && !event.isCanceled">Please Log in to purchase or return tickets!</button>

          <h3 v-if="(ticketTotal == 0)">SOLD OUT</h3>

          <button @click="cancelEvent" class="btn btn-danger m-1" v-if="(event?.creatorId == account.id) && !event?.isCanceled && (ticketTotal != 0)">Cancel Event</button>
          <h3 v-else-if="event?.isCanceled && (ticketTotal != 0)">Event Canceled</h3>
        </div>
      </div>
    </div>
  </div>

  <section class="row">
    <form class=" my-2 create-comment-card elevation-2 p-2 col-12" @submit.prevent="createComment">
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

  <!-- FIXME: type error, cannot read properties of undefined (reading 'picture') -->
  <!-- STUB: comments section -->
  <section class="row justify-content-center">
    <!-- NOTE: the :comment='comment', this is our props that we are passing to our component -->
    <div v-for="comment in comments" :key="comment.id" class="col-12 col-md-10 elevation-2 m-2 p-2 create-comment-card">
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
import {AppState} from "../AppState.js"
import {commentsService} from "../services/CommentsService.js"
import { ref } from "vue";
import {ticketsService} from '../services/TicketsService.js'
import { Comment } from "../models/Comment.js";

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


  // FIXME: comments not reactively pushing to the bottom of the comment list
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
    },

      dateFormat(date) {
        let newDate = new Date(date).toLocaleDateString('en-us', { month: 'long', day: 'numeric' })
        return newDate
      },

      timeFormat(time) {
        let newTime = new Date(time).toLocaleTimeString('en-us', { hour: 'numeric', minute: '2-digit' })
        return newTime
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

.img-background{
  background-color: #92946B;
  border-radius: 5px;
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

.ticketholder-card{
  background-color: #92946B;
  margin-bottom: 3em;
  padding: 1em;
  border-radius: 5px;
  min-height: 8em;
}

.sold-out{
  color:black;
  background-color: red;
  border-radius: 14px;
}

.create-comment-card{
  border-radius: 5px;
  background-color: #92946B;
}
</style>