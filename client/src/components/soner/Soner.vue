<template>
  <div class="soner">
    <audio ref="audio" crossorigin="anonymous">
      <source :src="$store.getters.audioSrc" type="audio/wav">
    </audio>
    <div class="">
      <span id="neuze" class="time">0:00</span>
      <span id="enHoll" class="time">0:00</span>
    </div>
    <button id="mezell" data-playing="false" role="switch" aria-checked="false"></button>
  </div>
</template>

<script>
import lottieWeb from 'lottie-web';

export default {
  name: 'Soner',
  methods: {
    context() {
      const audioContext = new window.AudioContext();
      const audioElement = this.$refs.audio;
      const channel = audioContext.createMediaElementSource(audioElement);
      channel.connect(audioContext.destination);
      const mezell = document.getElementById('mezell');

      const animation = lottieWeb.loadAnimation({
        container: mezell,
        path: '/pause.json',
        renderer: 'svg',
        loop: false,
        autoplay: false,
        name: "Player Animation",
      });

      animation.goToAndStop(14, true);

      mezell.addEventListener('click', function() {

        // play or pause track depending on state
        if (this.dataset.playing === 'false') {
            audioElement.play();
            animation.playSegments([14, 27], true)
            this.dataset.playing = 'true';
        } else if (this.dataset.playing === 'true') {
            audioElement.pause();
            animation.playSegments([0, 14], true)
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
  align-items: center;
  justify-content: center;
}

button {
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
  outline: none;
  width: calc(20px + 1.5*2vh);
  height: calc(20px + 1.5*2vh);
}

span {
  position: absolute;
  color: rgba(255,255,255,0.65);
  bottom: calc(15vh - 2em);
}
#neuze {
  left: 10px;
}
#enHoll {
  right: 10px;
}
</style>
