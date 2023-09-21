<template>

<!-- NOTE: modal trigger button -->
  <button class="btn btn-dark me-2" data-bs-toggle="modal" :data-bs-target="`#${id}`">
    <slot name="button">
      open {{ id }} modal
    </slot>
  </button>

  <div class="modal fade" id="id" tabindex="-1" aria-labelledby="modalTitleId" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="header">
          <slot>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="close"></button>
          </slot>
        </div>
        <div class="modal-body">
          <slot name="body">

          </slot>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
props: { id: { type: String, required: true }, showButton: { type: Boolean, default: true } },
setup() {
  return {};
},
};
</script>


<style>
</style>
