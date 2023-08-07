import React from 'react';
import { View, Text } from 'react-native';
import PaymentPage from './src/PaymentPage';
import { StripeProvider } from '@stripe/stripe-react-native';
import Testing from './src/Testing';

function App() {
  return (
    <StripeProvider publishableKey="pk_test_51N9ih4SBtJCTWNpQrRd9e3TgjWE67QrIGd9zjAASmPdmRrbueB6aADWK1uX3hm0AMyebvvQwCD6iXaQtLrDgOoKb00yn58Ba3Z">
      <PaymentPage />
      {/* <Testing /> */}
    </StripeProvider>
  );
}
export default App;
