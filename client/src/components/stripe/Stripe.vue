<template>
  <div class="container">
    <div class="keleierProdu">
      <div class="danvez">
        <h3>Komz a ran brezhoneg<br>bremañ!</h3>
        <h2>10€/mois</h2>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Stripe',
}
</script>

<style lang="css" scoped>
.container {
  padding: 1vmax;
  margin: auto;
  margin-top: 5vmax;
  background: #fff;
  border-radius: 1vmax;
  display: flex;
  flex-direction: column;
  z-index: 1;
}
.keleierProdu {
  background: linear-gradient(320deg, rgba(121,255,114,1) 0%, rgba(145,255,219,1) 100%);
  border-radius: calc(1vmax + 1px);
  padding: 1px;
}
.keleierProdu .danvez {
  background-color: rgba(255, 255, 255, 0.9);
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
