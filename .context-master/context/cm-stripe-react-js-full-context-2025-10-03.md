================
CODE SNIPPETS
================
TITLE: Run Examples with Storybook - React Stripe.js - sh
DESCRIPTION: This command starts the Storybook development server, allowing developers to view and interact with the component examples provided in the library.

SOURCE: https://github.com/stripe/react-stripe-js/blob/master/CONTRIBUTING.md#_snippet_1

LANGUAGE: sh
CODE:
```
yarn storybook
```

--------------------------------

TITLE: Install React Stripe.js and Stripe.js
DESCRIPTION: Installs the necessary npm packages for using React Stripe.js components and the core Stripe.js library in your project.

SOURCE: https://github.com/stripe/react-stripe-js/blob/master/README.md#_snippet_0

LANGUAGE: sh
CODE:
```
npm install @stripe/react-stripe-js @stripe/stripe-js
```

--------------------------------

TITLE: Install Dependencies - React Stripe.js - sh
DESCRIPTION: This command uses Yarn to install all necessary project dependencies listed in the package.json file. It's the first step to setting up the development environment.

SOURCE: https://github.com/stripe/react-stripe-js/blob/master/CONTRIBUTING.md#_snippet_0

LANGUAGE: sh
CODE:
```
yarn install
```

--------------------------------

TITLE: Minimal Payment Example using React Hooks
DESCRIPTION: Demonstrates a basic payment flow in a React application using `@stripe/react-stripe-js` hooks (`useStripe`, `useElements`) and components (`Elements`, `PaymentElement`). It includes setting up the Elements provider, handling form submission, fetching a client secret from a backend (simulated), confirming the payment, and displaying errors.

SOURCE: https://github.com/stripe/react-stripe-js/blob/master/README.md#_snippet_1

LANGUAGE: jsx
CODE:
```
import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    // Trigger form validation and wallet collection
    const {error: submitError} = await elements.submit();
    if (submitError) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      return;
    }

    // Create the PaymentIntent and obtain clientSecret from your server endpoint
    const res = await fetch('/create-intent', {
      method: 'POST',
    });

    const {client_secret: clientSecret} = await res.json();

    const {error} = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      clientSecret,
      confirmParams: {
        return_url: 'https://example.com/order/123/complete',
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe || !elements}>
        Pay
      </button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

const options = {
  mode: 'payment',
  amount: 1099,
  currency: 'usd',
  // Fully customizable with appearance API.
  appearance: {
    /*...*/
  },
};

const App = () => (
  <Elements stripe={stripePromise} options={options}>
    <CheckoutForm />
  </Elements>
);

ReactDOM.render(<App />, document.body);
```

--------------------------------

TITLE: Run ESLint Linter - React Stripe.js - sh
DESCRIPTION: Runs the ESLint linter to check the code for style guide violations, potential errors, and code quality issues.

SOURCE: https://github.com/stripe/react-stripe-js/blob/master/CONTRIBUTING.md#_snippet_4

LANGUAGE: sh
CODE:
```
yarn run lint
```

--------------------------------

TITLE: Implementing Stripe Payment Element in React Class Component
DESCRIPTION: This snippet shows a complete example of a React class component (`CheckoutForm`) that uses the Stripe Payment Element. It includes handling form submission, calling `elements.submit()` for validation, fetching a client secret from a backend endpoint (`/create-intent`), and confirming the payment using `stripe.confirmPayment()`. It also demonstrates setting up the Stripe `Elements` provider and using `ElementsConsumer` to pass `stripe` and `elements` instances to the component.

SOURCE: https://github.com/stripe/react-stripe-js/blob/master/README.md#_snippet_2

LANGUAGE: jsx
CODE:
```
import React from 'react';
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';
import {
  PaymentElement,
  Elements,
  ElementsConsumer,
} from '@stripe/react-stripe-js';

class CheckoutForm extends React.Component {
  handleSubmit = async (event) => {
    event.preventDefault();
    const {stripe, elements} = this.props;

    if (elements == null) {
      return;
    }

    // Trigger form validation and wallet collection
    const {error: submitError} = await elements.submit();
    if (submitError) {
      // Show error to your customer
      return;
    }

    // Create the PaymentIntent and obtain clientSecret
    const res = await fetch('/create-intent', {
      method: 'POST',
    });

    const {client_secret: clientSecret} = await res.json();

    const {error} = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      clientSecret,
      confirmParams: {
        return_url: 'https://example.com/order/123/complete',
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  render() {
    const {stripe} = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <PaymentElement />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    );
  }
}

const InjectedCheckoutForm = () => (
  <ElementsConsumer>
    {({stripe, elements}) => (
      <CheckoutForm stripe={stripe} elements={elements} />
    )}
  </ElementsConsumer>
);

const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

const options = {
  mode: 'payment',
  amount: 1099,
  currency: 'usd',
  // Fully customizable with appearance API.
  appearance: {
    /*...*/
  },
};

const App = () => (
  <Elements stripe={stripePromise} options={options}>
    <InjectedCheckoutForm />
  </Elements>
);

ReactDOM.render(<App />, document.body);
```

--------------------------------

TITLE: Run Prettier Formatter - React Stripe.js - sh
DESCRIPTION: Executes the Prettier code formatter to automatically format the codebase according to predefined style rules, ensuring consistent code style.

SOURCE: https://github.com/stripe/react-stripe-js/blob/master/CONTRIBUTING.md#_snippet_5

LANGUAGE: sh
CODE:
```
yarn run prettier
```

--------------------------------

TITLE: Run Jest Tests - React Stripe.js - sh
DESCRIPTION: Runs the Jest test suite to execute unit and integration tests for the library's components and functionality.

SOURCE: https://github.com/stripe/react-stripe-js/blob/master/CONTRIBUTING.md#_snippet_3

LANGUAGE: sh
CODE:
```
yarn test
```

--------------------------------

TITLE: Using react-stripe-js with useStripe/useElements Hooks (After)
DESCRIPTION: This snippet demonstrates the modern approach using the useStripe and useElements hooks. The stripe and elements instances are accessed directly within the functional component using these hooks. The CardElement instance must be explicitly retrieved using elements.getElement(CardElement) and then passed to Stripe.js methods like createToken, createPaymentMethod, or confirmCardPayment.

SOURCE: https://github.com/stripe/react-stripe-js/blob/master/docs/migrating.md#_snippet_1

LANGUAGE: jsx
CODE:
```
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Use elements.getElement to get a reference to the mounted Element.
    const cardElement = elements.getElement(CardElement);

    // Pass the Element directly to other Stripe.js methods:
    // e.g. createToken - https://stripe.com/docs/js/tokens_sources/create_token?type=cardElement
    stripe.createToken(cardElement);

    // or createPaymentMethod - https://stripe.com/docs/js/payment_methods/create_payment_method
    stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    // or confirmCardPayment - https://stripe.com/docs/js/payment_intents/confirm_card_payment
    stripe.confirmCardPayment(paymentIntentClientSecret, {
      payment_method: {
        card: cardElement,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button>Pay</button>
    </form>
  );
};
```