<template>
  <div class="container">
    <h1>Komz a ran Brezhoneg bremañ!</h1>
    <form id="subscription-form">
      <div class="dibab">
        <input type="radio" id="hiniennel" :value="$store.state.stripe.prices[0]" checked v-model="priz">
        <label for="hiniennel">
          <div class="keleierProdu">
            <div class="danvez">
              <h3>S'abonner pour :</h3>
              <h2>10€/mois</h2>
            </div>
          </div>
        </label>
      </div>
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
            <!--TODO: dispatiañ an elfennoù gant an API amañ
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
import axios from 'axios'
import Swal from 'sweetalert2'

var stripe = window.Stripe('pk_test_51HekNwLl0gLr1Vo6MecpLR03h5PXkxKsxs0O8FGnigvcZp2JlNmmrfB9l7WJOI1ZyyF0Z9RVetD626bne5AF7EYR00jVr6oSkl'),
elements = stripe.elements(),
card = undefined;

export default {
  name: 'Stripe',
  data() {
    return {
      priz: this.$store.state.stripe.prices[0], // Default price
      anvF: '',
      anvBihan: '',
      anv: this.anvBihan + ' ' + this.anvF
    }
  },
  methods: {
    changeLoadingStatePrices(boolean) {
      return boolean; // TODO: create a loading state for the form
    },
    createPaymentMethod(elements, stripe, form) {
      const customerId = this.$store.state.user.customerId;
      const self = this;
      const priceId = this.priz;
      const additionalData = {
        name: this.anv
      };
      // Set up payment method for recurring usage


      stripe.createPaymentMethod({
        type: 'card',
        card: elements[0],
        billing_details: additionalData,
      })
      .then((result) => {
        if (!result.error) {
          self.createSubscription({
            customerId: customerId,
            paymentMethodId: result.paymentMethod.id,
            priceId: priceId,
          }, stripe, form);
        }
      });
    },
    createSubscription({ customerId, paymentMethodId, priceId }, stripe, form) {
      const self = this;

      return (
        axios.post(`${this.$store.state.API}/api/subscribe`, {
          customerId,
          paymentMethodId,
          priceId
        })
        .then((result) => {
          if (result.data.error) {
            // The card had an error when trying to attach it to a customer.
            throw result.data.error.message;
          }
          return  {
            // Normalize the result to contain the object returned by Stripe.
            // Add the additional details we need.
            subscription: result.data,
            paymentMethodId: paymentMethodId,
            priceId: priceId
          };
        })
        // Some payment methods require a customer to be on session
        // to complete the payment process. Check the status of the
        // payment intent to handle these actions.
        .then(self.handlePaymentThatRequiresCustomerAction)
        // If attaching this card to a Customer object succeeds,
        // but attempts to charge the customer fail, you
        // get a requires_payment_method error.
        .then(self.handleRequiresPaymentMethod)
        // No more actions required. Provision your service for the user.
        .then(self.onSubscriptionComplete)
        .catch((error) => {
          // An error has happened. Display the failure to the user here.
          // We utilize the HTML element we created.
          const err = (error.response)? error.response.data.error.message : null || error.message;

          self.enableInputs(form)
          Swal.fire({
            icon: 'error',
            text: err
          });
        })
      );
    },
    disableInputs() {
      // TODO: make both enableInputs & disableInputs
    },
    displayError(event) {
      this.changeLoadingStatePrices(false);
      var displayError = document.getElementById('cardElements-errors');
      var message = displayError.querySelector('.message');
      console.log(displayError, message);
      if (event.error) {
        displayError.classList.add('visible');
        message.textContent = event.error.message;
      } else {
        displayError.classList.remove('visible');
      }
    },
    enableInputs(form) {
      return form; // TODO: make both enableInputs & disableInputs
    },
    handlePaymentThatRequiresCustomerAction({
      subscription,
      invoice,
      priceId,
      paymentMethodId,
      isRetry
    }) {
      if (subscription && subscription.status === 'active') {
        // Subscription is active, no customer actions required.
        return { subscription, priceId, paymentMethodId };
      }

      // If it's a first payment attempt, the payment intent is on the subscription latest invoice.
      // If it's a retry, the payment intent will be on the invoice itself.
      let paymentIntent = invoice ? invoice.payment_intent : subscription.latest_invoice.payment_intent;

      if (
        paymentIntent.status === 'requires_action' ||
        (isRetry === true && paymentIntent.status === 'requires_payment_method')
      ) {
        return stripe
        .confirmCardPayment(paymentIntent.client_secret, {
          payment_method: paymentMethodId,
        })
        .then((result) => {
          if (result.error) {
            // Start code flow to handle updating the payment details.
            // Display error message in your UI.
            // The card was declined (i.e. insufficient funds, card has expired, etc).
            throw result;
          } else {
            if (result.paymentIntent.status === 'succeeded') {
              // Show a success message to your customer.
              this.$store.commit('SET_SUB',  {boolean: true, id: subscription.id})
              this.$store.state.digor.stripe = false;
              this.$store.state.digor.perzhioù = false;
              Swal.fire({
                icon: 'success',
                title: 'Abonnement Réussi !',
                text: `Félicitations, vous venez de vous inscrire avec succès.`+
                ` Vous pouvez maintenant accéder à toutes les leçons de la méthode.`
              })
              return {
                priceId: priceId,
                subscription: subscription,
                invoice: invoice,
                paymentMethodId: paymentMethodId,
              };
            }
          }
        })
        .catch(({error}) => {
          throw error;
        });
      } else {
        // No customer action needed.
        return { subscription, priceId, paymentMethodId };
      }
    },
    handleRequiresPaymentMethod({
      subscription,
      paymentMethodId,
      priceId,
    }) {
      if (subscription.status === 'active') {
        // subscription is active, no customer actions required.
        return { subscription, priceId, paymentMethodId };
      } else if (
        subscription.latest_invoice.payment_intent.status ===
        'requires_payment_method'
      ) {
        // Using localStorage to manage the state of the retry here,
        // feel free to replace with what you prefer.
        // Store the latest invoice ID and status.
        localStorage.setItem('latestInvoiceId', subscription.latest_invoice.id);
        localStorage.setItem(
          'latestInvoicePaymentIntentStatus',
          subscription.latest_invoice.payment_intent.status
        );
        throw { error: { message: 'Votre carte a été déclinée' } };
      } else {
        return { subscription, priceId, paymentMethodId };
      }
    },
    onSubscriptionComplete(result) {
      // Payment was successful.
      if (result.subscription.status === 'active') {
        // Change your UI to show a success message to your customer.
        this.$store.commit('SET_SUB', {boolean: true, id: result.subscription.id})
        this.$store.state.digor.stripe = false;
        this.$store.state.digor.perzhioù = false;
        Swal.fire({
          icon: 'success',
          title: 'Abonnement Réussi !',
          text: `Félicitations, vous venez de vous abonner avec succès. `+
          `Vous pouvez maintenant accéder à toutes les leçons de la méthode.`
        })
        // `result.subscription.items.data[0].price.product` the customer subscribed to.
      }
    },
    registerElements(elements, containerName) {
      const className = '.' + containerName;
      const formContainer = document.querySelector(className);
      const self = this;

      card.on('change', function (event) {
        self.displayError(event);
      });

      var form = document.getElementById('subscription-form');

      form.addEventListener('submit', function (e) {
        e.preventDefault();

        // TODO: show a loading screen
        formContainer.classList.add('submitting');

        // TODO: disable all inputs!
        self.disableInputs();

        // Create a payment method. We only need to pass in one Element
        // from the Element group in order to create a payment method. We can also pass
        // in the additional customer data we collected in our form.

        self.createPaymentMethod(elements, stripe, form);
      });
    },
    retryInvoiceWithNewPaymentMethod({
      customerId,
      paymentMethodId,
      invoiceId,
      priceId
    }, form) {
      const self = this;

      return (
        axios.post(`${this.$store.state.API}/api/klask-endro`, {
          customerId: customerId,
          paymentMethodId: paymentMethodId,
          invoiceId: invoiceId
        })
        // If the card is declined, display an error to the user.
        .then((result) => {
          if (result.data.error) {
            // The card had an error when trying to attach it to a customer.
            throw result.data;
          }
          return result.data;
        })
        // Normalize the result to contain the object returned by Stripe.
        // Add the additional details we need.
        .then((invoice) => {
          return {
            // Use the Stripe 'object' property on the
            // returned result to understand what object is returned.
            invoice: invoice,
            paymentMethodId: paymentMethodId,
            priceId: priceId,
            isRetry: true,
          };
        })
        // Some payment methods require a customer to be on session
        // to complete the payment process. Check the status of the
        // payment intent to handle these actions.
        .then(self.handlePaymentThatRequiresCustomerAction)
        // No more actions required. Provision your service for the user.
        .then(self.onSubscriptionComplete)
        .catch((error) => {
          // An error has happened. Display the failure to the user here.
          // We utilize the HTML element we created.
          const err = (error.response)? error.response.data.error.message : null || error.message;

          self.enableInputs(form)
          Swal.fire({
            icon: 'error',
            text: err
          });
        })
      );
    }
  },
  mounted() {
    // Vue integration to Elements from:
    // https://www.digitalocean.com/community/tutorials/vuejs-stripe-elements-vue-integration
    if (card) {
      // if a card were created before
      // this will destroy the previous one
      card.destroy('#cardElements');
    }

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
          iconColor: '#ffcfc7',
          color: '#ffcfc7',
        },
      },
    };

    card = elements.create('card', style);
    card.mount('#cardElements');

    this.registerElements([card], 'container');
  }
}
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
}
h1 {
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
  width: 15ch;
  min-width: 70px;
  padding: 11px 0;
  color: #c4f0ff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
input {
  padding: 11px 15px 11px 0;
  color: #fff;
  background-color: transparent;
  -webkit-animation: 1ms void-animation-out;
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
.dibab {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3em;
}
.dibab input[type="radio"] {
  display: none;
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
  width: calc(100% - 30px);
  height: 40px;
  margin: 40px 15px 0;
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
