<template>





<!-- FIXME: still having issues where the modal does not automatically close, and it does not automatically take me to the details page -->

<!-- NOTE: modal trigger button NOTE: had to remove ${} from id, it was causing an issue -->
  <button v-if="showButton" type="button" class="btn btn-dark me-2" data-bs-toggle="modal" :data-bs-target="`#createEvent`">
    <slot name="button">
      open {{ createEvent }} modal
    </slot>
  </button>

  <div class="modal fade" id="createEvent" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <slot name="header">
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
