<template>
  <div class="container">
    <div class="dibab">
      <input type="radio" id="hiniennel" :value="$store.state.stripe.prices[0]" checked v-model="priz">
      <label for="hiniennel">
        <div class="keleierProdu">
          <div class="danvez">
            <h3>Komz a ran brezhoneg<br>bremañ!</h3>
            <h2>10€/mois</h2>
          </div>
        </div>
      </label>
    </div>
    <form id="subscription-form" class="frm">
      <label for="anv">Nom</label>
      <input type="text" id="anv" v-model="anv" placeholder="Anne de Bretagne">
      <div id="card-element">
        <!--TODO: dispatiañ an elfennoù gant an API amañ
         https://stripe.com/docs/js/elements_object/create_element?type=cardNumber -->
        <!-- Elements will create input elements here -->
      </div>
      <div id="card-element-errors" role="alert"></div>
      <button type="submit">Bec'h de'i!</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Stripe',
  data() {
    return {
      priz: this.$store.state.stripe.prices[0], // Default price
      anv: '',
    }
  },
  methods: {
    changeLoadingStatePrices(boolean) {
      return boolean; // TODO: create a loading state for the form
    },
    createPaymentMethod(card, stripe, form) {
      const customerId = this.$store.state.user.customerId,
      self = this;
      // Set up payment method for recurring usage
      let anv = this.anv;

      let priceId = this.priz;

      stripe
        .createPaymentMethod({
          type: 'card',
          card: card,
          billing_details: {
            name: anv,
          },
        })
        .then((result) => {
          if (result.error) {
            self.$swal.fire({
              icon: 'error',
              text: result.error.message
            });
          } else {
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
      this.disableInputs(form);

      function handlePaymentThatRequiresCustomerAction({
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
      }

      function handleRequiresPaymentMethod({
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
          throw { error: { message: 'Your card was declined.' } };
        } else {
          return { subscription, priceId, paymentMethodId };
        }
      }

      function onSubscriptionComplete(result) {
        // Payment was successful.
        if (result.subscription.status === 'active') {
          // Change your UI to show a success message to your customer.
          self.$store.commit('SET_SUB', true)
          self.$store.state.digor.stripe = false;
          self.$store.state.digor.perzhioù = false;
          self.$swal.fire({
            icon: 'success',
            title: 'Inscription Réussie !',
            text: `Félicitations, vous venez de vous inscrire avec succès.`+
            ` Vous pouvez maintenant accéder à toutes les leçons de la méthode.`
          })
          // `result.subscription.items.data[0].price.product` the customer subscribed to.
        }
      }

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
            paymentMethodId: paymentMethodId,
            priceId: priceId,
            subscription: result.data,
          };
        })
        // Some payment methods require a customer to be on session
        // to complete the payment process. Check the status of the
        // payment intent to handle these actions.
        .then(handlePaymentThatRequiresCustomerAction)
        // If attaching this card to a Customer object succeeds,
        // but attempts to charge the customer fail, you
        // get a requires_payment_method error.
        .then(handleRequiresPaymentMethod)
        // No more actions required. Provision your service for the user.
        .then(onSubscriptionComplete)
        .catch((error) => {
          // An error has happened. Display the failure to the user here.
          // We utilize the HTML element we created.
          const err = (error.response)? error.response.data.error.message : null || error.message;

          self.enableInputs(form)
          self.$swal.fire({
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
      let displayError = document.getElementById('card-element-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    },
    enableInputs(form) {
      return form; // TODO: make both enableInputs & disableInputs
    }
  },
  mounted() {
    const self = this,
    stripe = window.Stripe(this.$store.state.stripe.pk),
    elements = stripe.elements(),
    style = {
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

    // Vue integration to Elements from:
    // https://www.digitalocean.com/community/tutorials/vuejs-stripe-elements-vue-integration
    if (card) {
      // if a card were created before
      // this destroy the previous one
      card.destroy('#card-element');
    }

    var card = elements.create('card', { style: style });
    card.mount('#card-element')

    card.on('change', function (event) {
      self.displayError(event);
    });

    var form = document.getElementById('subscription-form');

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      self.createPaymentMethod(card, stripe, form)
    });

  }
}
</script>

<style lang="css" scoped>
.container {
  padding: 1vmax;
  margin: auto;
  background: #fff;
  border-radius: 1vmax;
  display: flex;
  flex-direction: column;
  z-index: 1;
}
.dibab {
  display: flex;
  align-items: center;
  justify-content: center;
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

.frm {

}
</style>
