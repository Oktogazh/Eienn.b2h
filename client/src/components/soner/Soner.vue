<template>
  <div class="soner">
    <audio :src="`${$store.state.API}/api/selaou/${$store.state.kentel.live || $store.state.user.live}`"
            crossorigin="anonymous"
            preload=”metadata”
            ref="audio"
            ></audio>
    <span id="bremañ" class="time"></span>
    <span id="enHoll" class="time"></span>
    <button id="mezell" data-playing="false" role="switch" aria-checked="false"></button>
    <button @click="kargañ(-1)" id="kent" v-if="$store.getters.niverenn > 1"></button>
    <button @click="kargañ(1)" id="raok"></button>
    <div id="lammat">
      <div class="hanter" @click="lammat(-10)">
        <div id="nemet">

        </div>
      </div>
      <div class="hanter" @click="lammat(10)">
        <div id="mui">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import lottieWeb from 'lottie-web';

export default {
  name: 'Soner',
  data() {
  },
  methods: {
    calculateTime(secs) {
      const minutes = Math.floor(secs / 60);
      const seconds = Math.floor(secs % 60);
      const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${minutes}:${returnedSeconds}`;
    },
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
    lammat(prantad) {
      this.$refs.audio.currentTime += prantad;
    },
    selaou(komz) {
      const pred = komz[1];
      this.$refs.audio.currentTime = pred;
      if (this.mezell.dataset.playing === 'false') {
        this.mezell.click();
      }
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
      audio.addEventListener('timeupdate', () => {
        document.getElementById('bremañ').innerText =
        this.calculateTime(audio.currentTime);
      })
    },
    soner() {
      const displayDuration = () => {
        document.getElementById('enHoll').textContent =
        this.calculateTime(this.$refs.audio.duration);
      }

      if (this.$refs.audio.readyState > 0) {
        displayDuration();
      } else {
        this.$refs.audio.addEventListener('loadedmetadata', () => {
          displayDuration();
        });
      }
      document.getElementById('bremañ').textContent =
      this.calculateTime(this.$refs.audio.currentTime);
    }
  },
  mounted() {
    /*const audioContext = new window.AudioContext();
    // Add both audioElement to this in order
    // to access them from this.kargañ*/
    const audioElement = this.audioElement = this.$refs.audio;/*
    const channel = audioContext.createMediaElementSource(audioElement);
    channel.connect(audioContext.destination);*/
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

#lammat {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  justify-content: center;
}
#lammat .hanter {
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

#nemet {
  width: calc(20px + 1.5*2vh);
  height: calc(20px + 1.5*2vh);
  background: url('/nemet.svg');
}

#mui {
  width: calc(20px + 1.5*2vh);
  height: calc(20px + 1.5*2vh);
  background: url('/mui.svg');
}

.soner > button {
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
  outline: none;
  width: calc(20px + 1.5*2vh);
  height: calc(20px + 1.5*2vh);
  z-index: 2;
}

.soner > span {
  position: absolute;
  color: rgba(255,255,255,0.65);
  bottom: calc(15vh - 2em);
  z-index: 2;
}

#bremañ {
  left: 10px;
}
#enHoll {
  right: 10px;
}

#raok {
  position: absolute;
  right: 5%;
  background: url('/raok.svg');
}
#kent {
  position: absolute;
  left: 5%;
  background: url('/kent.svg');
}
</style>
