<template>
  <div class="soner">
    <audio crossorigin="anonymous">
      <source :src="$store.getters.audioSrc" type="audio/wav">
    </audio>
    <div id="mezell" data-playing="false" role="switch" aria-checked="false">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Soner',
  methods: {
    context() {
      const audioContext = new window.AudioContext();
      const audioElement = document.querySelector('audio');
      const channel = audioContext.createMediaElementSource(audioElement);
      channel.connect(audioContext.destination);

      const mezell = document.getElementById('mezell');

      mezell.addEventListener('click', function() {

        // play or pause track depending on state
        if (this.dataset.playing === 'false') {
            audioElement.play();
            this.dataset.playing = 'true';
        } else if (this.dataset.playing === 'true') {
            audioElement.pause();
            this.dataset.playing = 'false';
        }

      });
      audioElement.addEventListener('ended', () => {
        mezell.dataset.playing = 'false';
      }, false);
    }
  },
  mounted() {
    this.context();
  }
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
  background: url('/gwag.svg');
  width: 10vh;
  height: 10vh;
  cursor: pointer;
}
</style>
