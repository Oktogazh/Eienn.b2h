<template>
  <div class="spletennoù">
    <input type="radio" name="spletenn" id="spletenn-1" checked>
    <label v-if="!$store.state.prenestrier.perzhioù.digoret" for="spletenn-1" @click="$store.state.prenestrier.perzhioù.digoret = false">{{ notennoù.titl }}</label>

    <input type="radio" name="spletenn" id="spletenn-2">
    <label v-if="!$store.state.prenestrier.perzhioù.digoret" for="spletenn-2" @click="$store.state.prenestrier.perzhioù.digoret = false">{{ geriaoueg.titl }}</label>

    <div class="spletenn">
      <div v-if="$store.state.prenestrier.perzhioù.digoret" >
          <Perzhioù />
      </div>
      <div v-if="$store.state.prenestrier.perzhioù.digoret" >
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

.spletennoù {
  text-align: left;
  width: 700px;
  margin: auto;
}

.spletennoù > input {
  display: none;
}

.spletennoù > label {
  display: block;
  float: left;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: -2px;
  padding: 12px 20px;
  cursor: pointer;
  transition: background-color .3s;
}

.spletennoù > label:hover {
  background: #fff;
  border: 2px solid #99abff;
  margin: -2px 3px;
}


.spletennoù > input:checked + label {
  background: #fff;
  border: 2px solid #99abff;
  border-bottom: solid 2px #fff;
  margin: -2px 3px;
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
  background: #fff;
  border: 2px solid #99abff;
  padding: 10px 30px 40px;
  line-height: 1.4em;
  font-size: 1.1em;
  display: none;
}

#spletenn-1:checked ~ .spletenn > div:nth-of-type(1),
#spletenn-2:checked ~ .spletenn > div:nth-of-type(2)
{
  display: block;
}

@media only screen and (max-width: calc(700px + 8vmin))
{
  .spletennoù {
    width: 100%;
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
