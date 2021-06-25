<template>
  <div class="dibab">
    <input type="radio"
            id="hiniennel"
            :value="$store.state.stripe.prices[0]"
            checked
            v-model="$store.state.stripe.dibabet">
    <label class="keleierProdu" for="hiniennel">
      <div class="danvez">
        <h3>M'abonner pour :</h3>
        <h2>10€/mois</h2>
      </div>
    </label>
  </div>
</template>

<script>
export default {
  name: 'Dibab'
}
</script>

<style scoped>
.dibab {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.dibab input[type="radio"] {
  display: none;
}
.dibab label {
  cursor: pointer;
}
.keleierProdu {
  background: linear-gradient(320deg, rgba(121,255,114,1) 0%, rgba(145,255,219,1) 100%);
  border-radius: calc(1vmax + 1px);
  padding: 1px;
  box-shadow: 5px 7px 20px rgba(49, 49, 72, 0.5);
  margin: 0 35px 35px;
}
.keleierProdu .danvez {
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 1vmax;
  padding: 1vmax;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.keleierProdu .danvez h2{
  color: rgba(255, 179, 0, 0.80);
}
</style>
