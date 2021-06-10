<template>
  <div class="margin-top"></div>
  <div class="spletennoù">
    <input type="radio" name="spletenn" id="spletenn-1" checked>
    <label v-if="!$store.state.digor.perzhioù" for="spletenn-1" @click="$store.state.digor.perzhioù = false">{{ notennoù.titl }}</label>

    <input type="radio" name="spletenn" id="spletenn-2">
    <label v-if="!$store.state.digor.perzhioù" for="spletenn-2" @click="$store.state.digor.perzhioù = false">{{ geriaoueg.titl }}</label>

    <div class="spletenn">
      <div v-if="$store.state.digor.perzhioù" >
          <Perzhioù />
      </div>
      <div v-if="$store.state.digor.perzhioù" >
          <Perzhioù />
      </div>
      <div>
        <p>{{ danvez }}</p>
      </div>
      <div>
        <p>{{ danvez }}</p>
      </div>
    </div>
  </div>

</template>

<script>
import Perzhioù from '../perzhioù/Perzhioù'

export default {
  name: 'Spletennoù',
  data() {
    return {
      danvez: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
      notennoù: {
        titl: 'Notes',
        danvez: null,
      },
      geriaoueg: {
        titl: 'Vocabulaire',
        danvez: null,
      }
    }
  },
  components: {
    Perzhioù
  }
}
</script>

<style scoped media="screen">
* {
  box-sizing: border-box;
}

::selection {
  color: #000;
}

.margin-top {
  height: 15vh;
}

.spletennoù {
  text-align: left;
  width: 700px;
}

.spletennoù > input {
  display: none;
}

.spletennoù > label {
  display: block;
  float: left;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: -1px;
  padding: 12px 20px;
  cursor: pointer;
  transition: background-color .3s;
  border-radius: 5px 5px 0px 0px;
}

.spletennoù > label:hover {
  background: rgba(255, 255, 255, 0.8);
  margin: -0px 5px 0px;
}


.spletennoù > input:checked + label {
  background: rgba(255, 255, 255, 0.8);
  margin: -0px 5px 0px;
  transition: border-bottom .3s;
  -webkit-text-stroke-width: .25px;
}

.perzhioù {
  float: right;
}

.spletenn {
  clear: both;
}

.spletenn > div {
  background: rgba(255, 255, 255, 0.8);
  padding: 1em 3em 4em;
  line-height: 1.4em;
  font-size: 1.1em;
  display: none;
  border-radius: 0.7% 3% 20% 7%;
  max-height: 55vh;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.spletenn > div::-webkit-scrollbar {
  display: none;
}

#spletenn-1:checked ~ .spletenn > div:nth-of-type(1),
#spletenn-2:checked ~ .spletenn > div:nth-of-type(2)
{
  display: block;
}

@media only screen and (max-width: calc(700px + 8vmin)) {
  .spletennoù {
    width: 90vw;
  }
  .spletennoù > label {
    font-size: 2.33vmax;
    padding: 8px 15px;
  }
  .spletenn > div {
    font-size: 2.33vmax;
    line-height: 2.8vmax;
    padding: 1.32vmax 3.97vmax 5.3vmax;
  }
}
</style>
