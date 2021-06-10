<template>
  <div class="soner">
    <button data-playing="false" role="switch" aria-checked="false">
        <span>Mezell</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Soner',
}
</script>

<style scoped>
.soner {
  position: absolute;
  background: linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.65) 100%);
  box-shadow: 0 5px 20px;
  left: 0px;
  bottom: 0px;
  height: 15vh;
  width: 100%;
}

</style>
