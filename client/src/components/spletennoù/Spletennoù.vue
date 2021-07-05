<template>
  <div class="spletennoù">
    <input type="radio" name="spletenn" id="spletenn-1" checked>
    <label v-if="!$store.state.digor.perzhioù && $store.state.kentel.notennoù" for="spletenn-1" v-html="$store.state.kentel.notennoù.titl"></label>

    <input type="radio" name="spletenn" id="spletenn-2">
    <label v-if="!$store.state.digor.perzhioù && $store.state.kentel.geriaoueg" for="spletenn-2" v-html="$store.state.kentel.geriaoueg.titl"></label>

    <div class="spletenn">
      <div v-if="$store.state.digor.perzhioù" >
          <Perzhioù />
      </div>
      <div v-if="$store.state.digor.perzhioù" >
          <Perzhioù />
      </div>
      <div>
        <VRuntimeTemplate :template="$store.getters.danvezN"></VRuntimeTemplate>
      </div>
      <div>
        <div v-if="$store.state.kentel.geriaoueg" class="geriaoueg">
          <div v-for="komz in $store.state.kentel.geriaoueg.danvez"
            :key="komz"
            v-html="komz[0]"
            @click="$parent.$refs.soner.selaou(komz)"
          >
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Perzhioù from '../perzhioù/Perzhioù'
import VRuntimeTemplate from "vue3-runtime-template";

export default {
  name: 'Spletennoù',
  components: {
    Perzhioù,
    VRuntimeTemplate
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

* >>> ::selection {
  color: #000;
}

* >>> a {
  font-weight: bold;
  color: #42c114;
}

.spletennoù {
  text-align: left !important;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: auto;
  width: 700px;
  max-width: 100vw;
}

.spletennoù > input {
  display: none;
}

.spletennoù > label {
  display: inline-block;;
  margin-left: 5px;
  margin-right: 5px;
  padding: 2vh 2vh;
  cursor: pointer;
  transition: background-color .3s;
  border-radius: 5px 5px 0px 0px;
  max-width: 45%;
  word-wrap: break-word;
  white-space: nowrap;
  display:flex;
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.spletennoù > label:hover {
  background: rgba(255, 255, 255, 0.8);
}


.spletennoù > input:checked + label {
  background: linear-gradient(0deg, rgba(255,255,255,.85) 0%, rgba(255,255,255,0.8) 25%);
  margin: -0px 5px 0px;
  transition: border-bottom .3s;
  -webkit-text-stroke-width: .25px;
  z-index: 1;
}

.perzhioù {
  float: right;
}

.spletenn {
  width: 100%;
}

.spletenn > div {
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 10px 25px 0px rgba(0,0,0,0.4);
  padding: 1em 3em 4em;
  line-height: 1.4em;
  font-size: 1.1em;
  display: none;
  border-radius: 0.7% 3% 20% 7%;
  max-height: 55vh;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  align-self: center;
  width: 100%;
}
.spletenn > div::-webkit-scrollbar {
  display: none;
}

#spletenn-1:checked ~ .spletenn > div:nth-of-type(1),
#spletenn-2:checked ~ .spletenn > div:nth-of-type(2)
{
  display: block;
}

.geriaoueg {
  margin: 1em;
}
.geriaoueg div {
  cursor: pointer;
}
div >>> strong[class=liamm] {
  cursor: pointer;
}

@media only screen and (max-width: 700px) {
  .spletennoù {
    width: 100vw;
  }
}
</style>
