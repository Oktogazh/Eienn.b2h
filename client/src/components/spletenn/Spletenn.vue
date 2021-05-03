<template>
  <div class="spletennoù">
    <input type="radio" name="spletenn" id="spletenn-1" checked>
    <label for="spletenn-1">{{ notennoù.titl }}</label>

    <input type="radio" name="spletenn" id="spletenn-2">
    <label for="spletenn-2">{{ geriaoueg.titl }}</label>

    <input type="radio" name="spletenn" id="spletenn-3">
    <label style="float: right" for="spletenn-3">{{ notennoù.titl }}</label>

    <div class="spletenn">
      <div>
        <h2>{{ notennoù.titl }}</h2>
        <p>{{ danvez }}</p>
      </div>
      <div>
        <h2>{{ geriaoueg.titl }}</h2>
        <p>{{ danvez }}</p>
      </div>
      <div>
        <h2>{{ notennoù.titl }}</h2>
        <p>{{ danvez }}</p>
      </div>
    </div>
  </div>

</template>

<script>

export default {
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
  }

}
</script>

<style media="screen">
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
  z-index: 1;
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
  z-index: 1;
  transition: border-bottom .3s;
}

.spletenn {
  clear: both;
}

.spletenn > div {
  background: #fff;
  border: 2px solid #99abff;
  padding: 10px 30px 40px;
  line-height: 1.4em;
  display: none;
  z-index: 0;
}

#spletenn-1:checked ~ .spletenn > div:nth-of-type(1),
#spletenn-2:checked ~ .spletenn > div:nth-of-type(2),
#spletenn-3:checked ~ .spletenn > div:nth-of-type(3)
{
  display: block;
  z-index: 1;
}

@media only screen and (max-width: 700px)
{
  .spletennoù {
    width: 90%;
  }
  .spletennoù > div {
    width: 90%;
    line-height: 1em;
  }

}
</style>
