<template>
  <div class="card"><h2>Komz a ran brezhoneg</h2>
    <form class="kef" @submit.prevent="paeañ">
          <fieldset>
            <div class="row">
              <label for="email">Email</label>
              <input id="email" type="email" required="" :value="$store.state.user.email" autocomplete="email">
            </div>
            <div class="row">
              <label for="anv">Nom</label>
              <input id="anv" type="text" placeholder="ANNA VREIZH" required="" autocomplete="name">
            </div>
            <div class="row">
              <label for="address">Adresse</label>
              <input id="address" v-model="chomleX" placeholder="4 Pl. Marc Elder">
            </div>
            <div class="row noBorder">
              <label for="zip">Ville</label>
              <input id="zip" v-model="annez" maxlength="5" placeholder="44000">
              <input id="city" v-model="city" placeholder="Naoned" type="text">
              <label for="zip">Pays</label>
              <input id="country" v-model="bro" placeholder="BZH" type="text">
            </div>
          </fieldset>
          <fieldset>
            <div class="row">
              <div id="card" class="StripeElement StripeElement--complete">
              </div>
            </div>
          </fieldset>
          <button type="submit" data-tid="elements_examples.form.pay_button">BREMAÑ!</button>
          <div class="error" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17">
              <path class="base" fill="#000" d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"></path>
              <path class="glyph" fill="#FFF" d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"></path>
            </svg>
            <span class="message">Cette carte n'est pas valide</span>
          </div>
    </form>
  </div>
</template>

<script>
let stripe = window.Stripe('pk_test_51HekNwLl0gLr1Vo6MecpLR03h5PXkxKsxs0O8FGnigvcZp2JlNmmrfB9l7WJOI1ZyyF0Z9RVetD626bne5AF7EYR00jVr6oSkl'),
    elements = stripe.elements(),
    card = undefined;

export default {
  name: 'Elements',
  data() {
    return {
      annez: '',
      bro: '',
      chomleX: '',

    }
  },
  methods: {
    paeañ() {
      console.log('o paeañ!')
    }
  },
  mounted: function () {
    // Vue integration to Elements from https://www.digitalocean.com/community/tutorials/vuejs-stripe-elements-vue-integration
    if (card) {
      // if a card were created before
      // this destroy the previous one
      card.destroy('#card');
    }

    // style comming from https://github.com/stripe/elements-examples/tree/888b4bdca59a450314c172534290fdb04861d34b
    const style = {
      iconStyle: 'solid',
      style: {
        base: {
          iconColor: '#c4f0ff',
          color: '#fff',
          fontWeight: 500,
          fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
          fontSize: '16px',
          fontSmoothing: 'antialiased',

          ':-webkit-autofill': {
            color: '#fce883',
          },
          '::placeholder': {
            color: '#87BBFD',
          },
        },
        invalid: {
          iconColor: '#FFC7EE',
          color: '#FFC7EE',
        },
      },
    }

    function registerElements(elements, exampleName) {
      var formClass = '.' + exampleName;
      var example = document.querySelector(formClass);

      var form = example.querySelector('form');
      var error = form.querySelector('.error');
      var errorMessage = error.querySelector('.message');

      function enableInputs() {
        Array.prototype.forEach.call(
          form.querySelectorAll(
            "input[type='text'], input[type='email'], input[type='tel']"
          ),
          function(input) {
            input.removeAttribute('disabled');
          }
        );
      }

      function disableInputs() {
        Array.prototype.forEach.call(
          form.querySelectorAll(
            "input[type='text'], input[type='email'], input[type='tel']"
          ),
          function(input) {
            input.setAttribute('disabled', 'true');
          }
        );
      }

      // Listen for errors from each Element, and show error messages in the UI.
      elements.forEach(function(element) {
        element.on('change', function(event) {
          if (event.error) {
            error.classList.add('visible');
            errorMessage.innerText = event.error.message;
          } else {
            error.classList.remove('visible');
          }
        });
      });

      // Listen on the form's 'submit' handler...
      form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Show a loading screen...
        example.classList.add('submitting');

        // Disable all inputs.
        disableInputs();

        // Gather additional customer data we may have collected in our form.
        var name = form.querySelector('#' + exampleName + '-name');
        var address1 = form.querySelector('#' + exampleName + '-address');
        var city = form.querySelector('#' + exampleName + '-city');
        var state = form.querySelector('#' + exampleName + '-state');
        var zip = form.querySelector('#' + exampleName + '-zip');
        var additionalData = {
          name: name ? name.value : undefined,
          address_line1: address1 ? address1.value : undefined,
          address_city: city ? city.value : undefined,
          address_state: state ? state.value : undefined,
          address_zip: zip ? zip.value : undefined,
        };

        // Use Stripe.js to create a token. We only need to pass in one Element
        // from the Element group in order to create a token. We can also pass
        // in the additional customer data we collected in our form.
        stripe.createToken(elements[0], additionalData).then(function(result) {
          // Stop loading!
          example.classList.remove('submitting');

          if (result.token) {
            // If we received a token, show the token ID.
            example.querySelector('.token').innerText = result.token.id;
            example.classList.add('submitted');
          } else {
            // Otherwise, un-disable inputs.
            enableInputs();
          }
        });
      });

        // Reset error state as well.
        error.classList.remove('visible');

        // Resetting the form does not un-disable inputs, so we need to do it separately:
        enableInputs();
        example.classList.remove('submitted');
    }

    card = elements.create('card', style);
    card.mount('#card');

    registerElements([card], 'kef')
  },
  watch: {
    annez: function(annez) {
      if (!annez.length < 2) {
        let kv = annez.slice(0,2);
        if (kv == '22' || kv ==  '29' || kv == '35' || kv == '44' || kv == '56') {
          this.bro = 'Bretagne'
        }
      }
    }
  }
}
</script>

<style scoped>
.card {
  padding: 3vmax;
  margin-top: 2vmax;
  margin: auto;
  background: #fff;
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
  width: auto;
}

h2 {
  color: #fff;
  margin-top: -1vmax;
  margin-bottom: 2vmax;
  text-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);

}

fieldset {
  margin: 0 15px 20px;
  padding: 0;
  border-style: none;
  background-color: rgba(119, 149, 249, 0.85);
  box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 #829fff;
  border-radius: 4px;
}

.row {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  margin-left: 15px;
}

.row + .row {
  border-top: 1px solid #819efc;
}

label {
  width: 15ch;
  min-width: 70px;
  padding: 11px 0;
  color: #c4f0ff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

input, button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  border-style: none;
}

input:-webkit-autofill {
  -webkit-text-fill-color: #fce883;
  transition: background-color 100000000s;
  -webkit-animation: 1ms void-animation-out;
}

input {
  padding: 11px 15px 11px 0;
  color: #fff;
  background-color: transparent;
  -webkit-animation: 1ms void-animation-out;
}

#zip {
  width: 7ch;
}

#city {
  width: 10ch;
  align-items: stretch;
}

#country {
  width: 20%;
}


input::-webkit-input-placeholder {
  color: #b3d4ff;
}

input::-moz-placeholder {
  color: #b3d4ff;
}

input:-ms-input-placeholder {
  color: #b3d4ff;
}

button {
  display: block;
  width: calc(100% - 30px);
  height: 40px;
  margin: 40px 15px 0;
  background-color: rgba(119, 249, 128, 0.85);
  box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  border: 0;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}

button:active {
  background-color: #d782d9;
  box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 #e298d8;
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


.success .icon .border {
  stroke: #87bbfd;
}

.success .icon .checkmark {
  stroke: #fff;
}

.success .title {
  color: #fff;
}

.success .message {
  color: #9cdbff;
}

.success .reset path {
  fill: #fff;
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

.iframe {
  border: medium none !important;
  margin: 0px !important;
  padding: 0px !important;
  width: 1px !important;
  min-width: 100% !important;
  overflow: hidden !important;
  display: block !important;
  user-select: none !important;
  will-change: transform !important;
  height: 19.2px;
  display: block !important;
  position: absolute !important;
  height: 1px !important;
  top: -1px !important;
  left: 0px !important;
  padding: 0px !important;
  margin: 0px !important;
  width: 100% !important;
  opacity: 0 !important;
  background: transparent none repeat scroll 0% 0% !important;
  pointer-events: none !important;
  font-size: 16px !important;
}


@media only screen and (max-width: 570px) {
  .card {
    margin-left: 0px;
    margin-right: 0px;
    padding: 10px 0px 0px;
    width: 100vw;
    position: absolute;
    left: 0px
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
    margin: auto;
    text-align: center;
    padding: 5px 0px 0px;
  }

  fieldset {
    margin: 0px;
    border-radius: 0px;
  }
  .noBorder {
    border-top: 0px !important;
  }

  input {
    padding: 11px 15px 11px 0;
    color: #fff;
    background-color: transparent;
    -webkit-animation: 1ms void-animation-out;
  }
}
</style>
