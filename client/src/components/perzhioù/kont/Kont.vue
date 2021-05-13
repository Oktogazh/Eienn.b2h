<template>
  <h1>Mon compte</h1>
  <h2 @click="$emit('klozañ')">←</h2>
  <h4 @click="koumanantiñ">M'abonner!</h4>

</template>

<script>
export default {
  name: 'Koumanannt',
  methods: {
    koumanantiñ() {
    }
  }
}
</script>

<style scoped>
h1 {
  display: block;
  float: left;
  margin-bottom: 4vmax;
}

h2 {
  display: block;
  float: right;
}

h2:hover,
h4:hover {
  cursor: pointer;
}

h4 {
  clear: both;
  text-align: center;
}

</style>
