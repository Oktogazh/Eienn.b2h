<template>
  <div k="$store.getters.niverenn > 0" class="soner">
    <audio :src="`${$store.state.API}/api/selaou/${$store.state.kentel.live || $store.state.user.live}`"
            crossorigin="anonymous"
            preload=”metadata”
            ref="audio"
            ></audio>
    <span id="bremañ" class="time"></span>
    <span id="enHoll" class="time"></span>
    <button id="mezell"
            data-playing="false"
            role="switch"
            aria-checked="false"
            ></button>
    <button @click="kargañ(-1, 'kent')" id="kent" v-show="$store.getters.niverenn > 0"></button>
    <button @click="kargañ(1, 'raok')" id="raok" v-show="$store.state.kentel.ouzhpenn"></button>
    <div id="lammat">
      <div class="hanter" @click="lammat('nemet', -10)">
        <div class="lammer" id="nemet">

        </div>
      </div>
      <div class="hanter" @click="lammat('mui', 10)">
        <div class="lammer" id="mui">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import lottieWeb from 'lottie-web';
import Swal from 'sweetalert2';

export default {
  name: 'Soner',
  data() {
    return {
      animation: {}
    }
  },
  methods: {
    buildAnim() {
      const animz = ['mezell', 'raok', 'kent', 'nemet', 'mui'];
      for (let anim of animz) {
        this.animation[anim] = lottieWeb.loadAnimation({
          container: document.getElementById(anim),
          path: `/${anim}.json`,
          renderer: 'svg',
          loop: false,
          autoplay: false,
          name: anim + 'Animation',
        });
      }
      this.animation.mezell.goToAndStop(14, true);
      this.animation.raok.goToAndStop(119, true);
      this.animation.kent.goToAndStop(119, true);
    },
    calculateTime(secs) {
      const minutes = Math.floor(secs / 60);
      const seconds = Math.floor(secs % 60);
      const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${minutes}:${returnedSeconds}`;
    },
    kargañ(ouzhpenn, id) {
      if (this.mezell.dataset.playing === 'true') {
          this.audioElement.pause();
          this.animation.mezell.playSegments([0, 14], true)
          this.mezell.dataset.playing = 'false';
      }


      const self = this;
      const live = this.$store.state.user.live;
      const klot = /(^\d+)(@\S+$)/g.exec(live);
      const nivNevez = Number(klot[1]) + ouzhpenn;
      function kavoutLive(sub, niv) {
        if (!sub && niv > 7) {
          Swal.fire({text: "Vous devez être abonné pour aller plus loin. " +
          "Allez dans la section 'Abonnement' pour en savoir plus."})
          return `${7}${klot[2]}`;
        } else {
          return `${nivNevez}${klot[2]}`;
        }
      }
      const liveNevez = kavoutLive(this.$store.state.user.sub, nivNevez);

      if (ouzhpenn === 1) {
        self.$store.state.kentel.ouzhpenn = false;
        self.$store.dispatch({
          type: 'kargañ',
          live: liveNevez,
          ouzhpenn: self.$store.state.kentel.ouzhpenn
        }).then( muioX => {
          if (muioX === true) {
            self.$store.state.kentel.ouzhpenn = true
            self.animation[id].playSegments([0, 120], true);
          }
        })
        self.$store.dispatch({
          type: 'kounaat',
          live: liveNevez
        });
      } else { // ie. ouzhpenn === -1
        self.animation[id].playSegments([0, 120], true);

        self.$store.dispatch({
          type: 'kargañ',
          live: liveNevez,
          ouzhpenn: self.$store.state.kentel.ouzhpenn
        })
          .then((cheñchet) => {
            if (cheñchet === true) {
              self.animation.raok.goToAndStop(120, true)
              self.animation.raok.playSegments([0, 120], true)
            }
          });
        self.$store.dispatch({
          type: 'kounaat',
          live: liveNevez
        });
      }
    },
    lammat(anv, prantad) {
      this.animation[anv].playSegments([0, 149], true)
      this.$refs.audio.currentTime += prantad;
    },
    selaou(komz) {
      const pred = komz[1];
      (pred !== undefined)? this.$refs.audio.currentTime = pred : null;
      if (this.mezell.dataset.playing === 'false') {
        this.mezell.click();
      }
    },
    sevelMezell() {
      const self = this;
      const audio = this.$refs.audio;
      this.buildAnim()

      this.mezell.addEventListener('click', function() {

        // play or pause track depending on state
        if (this.dataset.playing === 'false') {
            audio.play();
            self.animation.mezell.playSegments([14, 27], true)
            this.dataset.playing = 'true';
        } else if (this.dataset.playing === 'true') {
            audio.pause();
            self.animation.mezell.playSegments([0, 14], true)
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
    this.sevelMezell();

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

.lammer {
  max-width: 100%;
  height: 75%;
  cursor: pointer;
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
}
#kent {
  position: absolute;
  left: 5%;
}
</style>
