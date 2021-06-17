<template>
  <div class="soner">
    <audio :src="`${$store.state.API}/api/selaou/${$store.state.kentel.live}`"
            crossorigin="anonymous"
            preload=”metadata”
            ref="audio"
            ></audio>
    <span id="neuze" class="time">0:00</span>
    <span id="enHoll" class="time"></span>
    <button id="mezell" data-playing="false" role="switch" aria-checked="false"></button>
    <div @click="kargañ(-1)" id="kent" v-if="$store.getters.niverenn > 1"></div>
    <div @click="kargañ(1)" id="raok"></div>
    <div class=""></div>
  </div>
</template>

<script>
import lottieWeb from 'lottie-web';

export default {
  name: 'Soner',
  data() {
    return {
      seniñ: (pred) => {
        this.$refs.audio.play(pred);
      }
    }
  },
  methods: {
    kargañ(ouzhpenn) {
      if (this.mezell.dataset.playing === 'true') {
          this.audioElement.pause();
          this.animation.playSegments([0, 14], true)
          this.mezell.dataset.playing = 'false';
      }
      const live = this.$store.state.user.live;
      const rgx = /(^\d+)(@\S+$)/g;
      const klot = rgx.exec(live);
      const nivNevez = Number(klot[1]) + ouzhpenn;
      const liveNevez = `${nivNevez}${klot[2]}`;
      this.$store.dispatch({
        type: 'kargañ',
        live: liveNevez
      });
      this.$store.dispatch({
        type: 'kounaat',
        live: liveNevez
      });
    },
    selaou(komz) {
      const pred = komz[1];
      this.$refs.audio.currentTime = pred;
      this.seniñ(komz[1]);
    },
    sevelMezell(mezell) {
      const audio = this.$refs.audio;
      const animation = this.animation = lottieWeb.loadAnimation({
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
            audio.play();
            animation.playSegments([14, 27], true)
            this.dataset.playing = 'true';
        } else if (this.dataset.playing === 'true') {
            audio.pause();
            animation.playSegments([0, 14], true)
            this.dataset.playing = 'false';
        }
      })
    },
    soner() {
      const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${minutes}:${returnedSeconds}`;
      }

      const displayDuration = () => {
        document.getElementById('enHoll').textContent =
        calculateTime(this.$refs.audio.duration);
      }

      if (this.$refs.audio.readyState > 0) {
        displayDuration();
      } else {
        this.$refs.audio.addEventListener('loadedmetadata', () => {
          displayDuration();
        });
      }
    }
  },
  mounted() {
    const audioContext = new window.AudioContext();
    // Add both audioElement to this in order
    // to access them from this.kargañ
    const audioElement = this.audioElement = this.$refs.audio;
    const channel = audioContext.createMediaElementSource(audioElement);
    channel.connect(audioContext.destination);
    const mezell = this.mezell = document.getElementById('mezell');

    this.soner();
    this.sevelMezell(mezell);

    audioElement.addEventListener('ended', () => {
      mezell.dataset.playing = 'false';
    }, false);
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

#raok {
  position: absolute;
  right: 5%;
  width: calc(20px + 1.5*2vh);
  height: calc(20px + 1.5*2vh);
  background: url('/raok.svg');
  cursor: pointer;
}
#kent {
  position: absolute;
  left: 5%;
  width: calc(20px + 1.5*2vh);
  height: calc(20px + 1.5*2vh);
  background: url('/kent.svg');
  cursor: pointer;
}
</style>
