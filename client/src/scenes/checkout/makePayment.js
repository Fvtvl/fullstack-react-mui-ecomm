import { loadStripe } from '@stripe/stripe-js';
import { API_URL } from '../../config';

const stripePromise = loadStripe(
  'pk_test_51MWOUrDyE3ggmtxjA756lj222EOA5kt6LABAz7bpzBFse77rLbwnd6YOMyWDidigd2ZGV1mxKHd9BtuegIWo7c2R00RBFxFNd7'
);

export async function makePayment(values, cart) {
  const stripe = await stripePromise;
  const requestBody = {
    userName: [values.firstName, values.lastName].join(' '),
    email: values.email,
    products: cart.map(({ id, count }) => ({
      id,
      count,
    })),
  };

  const response = await fetch(`${API_URL}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  });
  const session = await response.json();
  await stripe.redirectToCheckout({
    sessionId: session.id,
  });
}
