<template>
  <div class="modal" @click="$emit('klozañ')">
  </div>
</template>

<script>
export default {
  name: 'Teñval'
}
</script>

<style>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1;
}

</style>
