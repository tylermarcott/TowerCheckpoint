<template>
  <section v-if="comment" class="card comment-card rounded">
    <div class="row p-2 d-flex justify-content-between">
      <div class="col-3" v-if="comment.creator">
        <img v-if="comment.creator" class="profile-img" :src="comment.creator.picture" :alt="comment.creator.name">
        {{ comment.creator.name }}
      </div>
      <div v-if="comment.isAttending" class="col-3">
        Attending <i class="mdi mdi-check"></i>
      </div>
    </div>
    <div class="row ms-4">
      {{ comment.body }}
    </div>

    <div class="row justify-content-end d-flex">
      <div class="col-3">
        <button @click="deleteComment(comment.id)" v-if="comment.creatorId == account.id" class="btn btn-danger">Delete Comment</button>
      </div>
    </div>

  </section>
</template>

<script>
import { computed } from "vue";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { commentsService } from "../services/CommentsService.js";
import { Comment } from "../models/Comment.js";  //NOTE: DOUBLE CHECK IMPORTS, this was causing an invalid prop error. I didn't import the comments model, so the prop had no idea what 'Comment was.'

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
  background-color: #e9ecef;
}

.profile-img{
  border-radius: 50%;
  max-width: 5vh;
  max-width: 5vh;
  object-fit: cover;
  object-position: center;
}
</style>