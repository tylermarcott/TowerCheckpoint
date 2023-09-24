<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>


<!-- TODO: ok, so I have to use my tickets by account. Once I have my tickets, I can use the tickets to get the eventId. Once I have the eventId, I can loop over event in events, for each event for each ticket I have with an eventId -->


</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import Pop from "../utils/Pop.js";
import { accountService } from "../services/AccountService.js";
export default {
  setup() {
    onMounted(()=> getTicketsByAccount());
    async function getTicketsByAccount(){
      try {
        const userId = AppState.account.id
        await accountService.getTicketsByAccount(userId)
      } catch (error) {
        Pop.error(error)
      }
    }
    return {
      account: computed(() => AppState.account),
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
