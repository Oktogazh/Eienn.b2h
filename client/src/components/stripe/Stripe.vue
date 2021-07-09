<template>
  <div class="container">
    <div class="loading">
    </div>
    <form id="subscription-form">
      <h1>Komz a ran Brezhoneg bremañ!</h1>
      <fieldset>
        <div class="row">
          <label for="anv">Nom</label>
          <input type="text" id="anvF" v-model="anvF" placeholder="de Bretagne">
          <label for="anv">Prenom</label>
          <input type="text" id="anvBihan" v-model="anvBihan" placeholder="Anne">
        </div>
      </fieldset>
      <fieldset>
        <div class="row">
          <div id="cardElements">
            <!--TODO: dispatiañ an elfennoù gant an API-mañ
            https://stripe.com/docs/js/elements_object/create_element?type=cardNumber -->
            <!-- Elements will create input elements here -->
          </div>
        </div>
      </fieldset>
      <button type="submit">Bec'h de'i!</button>
      <div class="error" id="cardElements-errors" role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17">
          <path class="base" fill="#000" d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"></path>
          <path class="glyph" fill="#FFF" d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"></path>
        </svg>
        <span class="message"></span>
      </div>
    </form>
  </div>
</template>

<script>
</script>

<style scoped>
.container {
  padding: 3vmax;
  margin-top: 2vmax;
  margin: auto;
  border-radius: 1ch;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-width: 600px;
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  font-family: Roboto, Open Sans, Segoe UI, sans-serif;
  font-size: 16px;
  font-weight: 500;
  background-color: #6772e5;
  z-index: 3;
  text-align: center;
  max-height: 90%;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.loading {
  z-index: 3;
  margin: auto;
}

h1 {
  color: #fff;
  margin-top: -1vmax;
  margin-bottom: 2vmax;
  text-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  line-height: 1em;
}
fieldset {
  margin: 0 0 20px;
  padding: 0;
  border-style: none;
  background-color: rgba(119, 149, 249, 0.85);
  box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08), inset 0 1px 0 #829fff;
  border-radius: 4px;
}
.row {
  display: flex;
  align-items: center;
  margin-left: 15px;
}
.row + .row {
  border-top: 1px solid #819efc;
}
.row label {
  width: auto;
  min-width: 70px;
  color: #c4f0ff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
input {
  margin-left: 3ch;
  padding: 11px 15px 11px 0;
  color: #fff;
  background-color: transparent;
  -webkit-animation: 1ms void-animation-out;
}

#anvF {
  width: 20ch;
}
#anvBihan {
  width: 10ch;
}
#zip {
  width: 7ch;
}
#city {
  width: 10ch;
  align-items: stretch;
}
#state {
  width: 15ch;
}

input::placeholder {
  color: #b3d4ff;
}
input, button {
  appearance: none;
  outline: none;
  border-style: none;
}

.StripeElement--webkit-autofill {
  background: transparent !important;
}
.StripeElement {
  width: 100%;
  padding: 11px 15px 11px 0;
}
.__PrivateStripeElement {
  margin: 0px !important;
  padding: 0px !important;
  border: medium none !important;
  display: block !important;
  background: transparent none repeat scroll 0% 0% !important;
  position: relative !important;
  opacity: 1 !important;
}

.error {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
  left: 0;
  padding: 0 15px;
  font-size: 13px !important;
  opacity: 0;
  transform: translateY(10px);
  transition-property: opacity, transform;
  transition-duration: 0.35s;
  transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
}
.error message {
  color: rgb(255, 110, 110);
}
.error.visible {
  opacity: 1;
  transform: none;
}

.error svg {
  flex-shrink: 0;
  margin-top: -1px;
  margin-right: 10px;
}

.error svg .base {
  fill: #fff;
}
.error svg .glyph {
  fill: #6772e5;
}
.error .message {
  color: #fff;
}
button {
  display: block;
  width: 100%;
  height: 40px;
  margin: 40px 0 0;
  background-color: rgba(73, 255, 86, 0.85);
  box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  border: 0;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}

@media only screen and (max-width: 615px) {
  .container {
    margin-left: 0px;
    margin-right: 0px;
    padding: 15px 0px 0px;
    width: 100vw;
    position: absolute;
    left: 0px;
    right: 0px;
  }
  .row {
    display: grid;
    margin-left: 5px;
    align-content: center;
  }
  .row * {
    margin: auto;
    text-align: center;
    padding: 0px 0px 10px;
  }
  .row label {
    padding: 5px 0px 0px;
  }

  input {
    padding: 11px 15px 11px 0 !important;
    color: #fff;
    background-color: transparent;
    -webkit-animation: 1ms void-animation-out;
  }

  #cardElements {
    margin: 3px;
    margin-top: 8px;
  }
}
</style>
