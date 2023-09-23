<template>

  <!-- TODO: next on the list is to create a button at the bottom of the comment so users can delete comments they create -->

  <section class="card comment-card rounded">
    <div class="row p-2">
      <img class="profile-img" :src="comment.creator.picture" :alt="comment.creator.name">
      {{ comment.creator.name }}
    </div>
    <div class="row ms-4">
      {{ comment.body }}
    </div>
  </section>
</template>

<script>
export default {
  props: {comment: {type: Comment || Object, required: true}},
setup() {
  return {};
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