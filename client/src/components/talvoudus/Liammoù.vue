<template>
  <div class="talvoudus">
    <a href="https://geriafurch.bzh/" target="blank">
      <figure style="text-align: center; margin: 1.5rem; margin-top: 0; float: left;">
        <img src="https://geriafurch.bzh/apple-icon-114x114.png" alt="Balafenn">
        <figcaption>Geriafurch</figcaption>
      </figure>
    </a>
    <a href="https://ya-kazetenn.bzh/" target="blank">
      <figure style="text-align: center; margin: 1.5rem; margin-top: 0; float: left;">
        <img src="https://ya-kazetenn.bzh/wp-content/uploads/2021/01/144.png" alt="Ya!">
        <figcaption>Kazetenn <i>Ya!</i></figcaption>
      </figure>
    </a>
    <a href="http://meurgorf.brezhoneg.bzh/" target="blank">
      <figure style="text-align: center; margin: 1.5rem; margin-top: 0; float: left;">
        <img src="/skeudennoù/OPAB.png" alt="an Ofis">
        <figcaption>Meurgorf</figcaption>
      </figure>
    </a>
    <a href="https://www.dispak.bzh/" target="blank">
      <figure style="text-align: center; margin: 1.5rem; margin-top: 0; float: left;">
        <img src="https://www.dispak.bzh/wp-content/uploads/2018/08/cropped-dispak-logo-09-192x192.png" alt="KB">
        <figcaption>Dispak</figcaption>
      </figure>
    </a>
    <a href="https://www.geobreizh.bzh/" target="blank">
      <figure style="text-align: center; margin: 1.5rem; margin-top: 0; float: left;">
        <img src="https://www.geobreizh.bzh/wp-content/uploads/2020/05/cropped-Logo-Geobreizh-carr%C3%A9-1-180x180.png" alt="Erminig">
        <figcaption>Geobreizh</figcaption>
      </figure>
    </a>
  </div>
</template>

<script>
export default {
  name: 'Liammoù',

}
</script>

<style scoped>
.talvoudus {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}

figure {
  text-align: center;
  margin: 1.5rem;
  margin-top: 0;
  float: left;
}

figure img {
  border-radius: 1.5rem;
  height: 90px;
}

a {
  font-weight: bold;
  color: #2c3e50;
}
</style>
