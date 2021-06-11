<template>
  <div class="soner">
    <audio src="myCoolTrack.mp3">
      <source src="" type="audio/wav">
      <h1>Utilisez Firefox pour accéder aux enregistrements</h1>
    </audio>
    <button id="mezell" data-playing="false" role="switch" aria-checked="false">
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
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
}

#mezell {

}

</style>
