<template>
  <section class="card comment-card rounded">
    <div class="row p-2">
      <img class="profile-img" :src="comment.creator.picture" :alt="comment?.creator.name">
      {{ comment?.creator.name }}
    </div>
    <div class="row ms-4">
      {{ comment?.body }}
    </div>

    <button @click="deleteComment(comment?.id)" v-if="comment?.creator.id == comment?.creatorId" class="btn btn-danger">Delete Comment</button>
  </section>
</template>

<script>
import { computed } from "vue";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { commentsService } from "../services/CommentsService.js";

export default {
  props: {comment: {type: Comment || Object, required: true}},
setup() {
  return {
    account: computed(()=> AppState.account),
    async deleteComment(commentId){
      try {
        await commentsService.deleteComment(commentId)
      } catch (error) {
        Pop.error(error)
      }
    }
  };
},
};
</script>


<style>
.comment-card{
  min-height: 20vh;
  max-width: 100%;
}

.profile-img{
  border-radius: 50%;
  max-width: 5vh;
  max-width: 5vh;
  object-fit: cover;
  object-position: center;
}
</style>