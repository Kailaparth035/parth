import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import cardValidator from 'card-validator';
import {
  confirmPayment,
  BillingDetails,
  useStripe,
  StripeProvider,
} from '@stripe/stripe-react-native';

const STRIPE_PUBLISHABLE_KEY =
  'pk_live_51N9ih4SBtJCTWNpQDHhPwRYlBGn2Wu48o8IWP9hhma2PEOZZW4ZzOvswuOrvThr2c8dhmF9u3weMcnesfaLdvH14003CYiOjoi';

const SecretKey = 'sk_test_51N9ih4SBtJCTWNpQVMKtxdsyxchtepifEztJ1KqeViSxaFrZDZkpvzvLFKCL8izkgEb7t7gplu8O0dU86DV50qyF00XFiTvSx2'
// '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';

var CARD_TOKEN = null;

function subscribeUser(creditCardToken) {
  return new Promise(resolve => {
    CARD_TOKEN = creditCardToken.id;
    setTimeout(() => {
      resolve({ status: true });
    }, 1000);
  });
}

const PaymentPage = () => {
  const [firstName, setFirstName] = useState('Hitul Nileshbhai NayakPara');
  const [cardNumber, setCardNumber] = useState('4038396960127033');
  const [cardType, setCardType] = useState('Visa');
  const [expiryDate, setExpiryDate] = useState('10/27');
  const [cvvCode, setCvvCode] = useState('332');
  const [stripeInitialized, setStripeInitialized] = useState(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  // useEffect(() => {
  //   const initializeStripe = async () => {
  //     await initStripe({
  //       publishableKey:
  //         'pk_test_51N9ih4SBtJCTWNpQrRd9e3TgjWE67QrIGd9zjAASmPdmRrbueB6aADWK1uX3hm0AMyebvvQwCD6iXaQtLrDgOoKb00yn58Ba3Z',
  //     });
  //     setStripeInitialized(true);
  //   };

  //   initializeStripe();
  // }, []);

  const onChangeCardNumber = data => {
    setCardNumber(data);
    if (cardValidator.number(data).card !== null) {
      console.log(
        'cardValidator.number(data).card.type :::',
        cardValidator.number(data).card.type,
      );
      setCardType(cardValidator.number(data).card.type);
    }
  };

  const getCreditCardToken = () => {
    const card = {
      'card[number]': cardNumber.replace(/ /g, ''),
      'card[exp_month]': expiryDate.split('/')[0],
      'card[exp_year]': expiryDate.split('/')[1],
      'card[cvc]': '314',
    };
    console.log('card ::::', card);

    return fetch('https://api.stripe.com/v1/tokens', {
      headers: {
        Accept: 'application/json',

        'Content-Type': 'application/x-www-form-urlencoded',

        Authorization: 'Bearer ' + STRIPE_PUBLISHABLE_KEY,
      },
      method: 'post',

      body: Object.keys(card)
        .map(key => key + '=' + card[key])
        .join('&'),
    })
      .then(async response => {
        // console.log('response!!!', response);
        let responseJson = await response.json();
        // console.log('responseJson!!!', JSON.stringify(responseJson));
        return responseJson;
      })
      .catch(error => { });
  };

  const charges = async () => {
    const Paymentcard = {
      amount: Math.round(1 * 100),
      currency: 'inr',
      description: 'Testing',
    };

    const response = await fetch('https://api.stripe.com/v1/payment_intents', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${SecretKey}`,
      },
      method: 'post',
      body: Object.keys(Paymentcard)
        .map(key => key + '=' + Paymentcard[key])
        .join('&'),
    });

    // then((response) => {
    console.log('response of response :;', response);
    return response.json();
    // });
    // const card = {
    //   amount: 1000,
    //   currency: 'inr',
    //   'payment_method_types[]': 'card',
    //   // automatic_payment_methods: true,
    //   // source: CARD_TOKEN,
    //   description: 'TESING',
    // };

    // const response = await fetch('https://api.stripe.com/v1/payment_intents', {
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     Authorization: `Bearer ${Secret_key}`,
    //   },

    //   method: 'post',

    //   body: Object.keys(card)
    //     .map(key => key + '=' + card[key])
    //     .join('&'),
    // });
    // // then((response) => {

    // let responseJson = await response.json();
    // console.log('response of response :;', responseJson);
    // return responseJson;
    // // });
  };

  const chargesConfirm = async id => {
    // setLoader(true);

    return fetch(
      'https://api.stripe.com/v1/payment_intents/' + id + '/confirm',
      {
        headers: {
          Accept: 'application/json',

          'Content-Type': 'application/x-www-form-urlencoded',

          Authorization: `Bearer ${Secret_key}`,
        },

        method: 'post',
        // Format the credit card data to a string of key-value pairs
        // divided by &
        // body: Object.keys(card)
        //   .map((key) => key + "=" + card[key])
        //   .join("&"),
      },
    ).then(async response => {
      const responseJson = await response.json();
      console.log('responseJson of payment :;', responseJson);
      // if (
      //   responseJson.status === 'succeeded' ||
      //   responseJson.status === 'requires_action'
      // ) {
      // setCardNumber("");
      // setExpiryDate("");
      // setcvc("");
      // setFirstName("");
      // setLastName("");

      // var orderPayload = props.route.params.payload;

      // orderPayload.payment_status = "done";
      // orderPayload.status = "ORDERED";
      // orderPayload.is_cart = false;

      // const orderId = props?.route?.params?.orderId;

      // // const response =await dispatch(paymentOrderd(orderPayload, orderId));
      // const response = await dispatch(placeOrder(orderPayload));

      // console.log("Payment Response ::=> ", response);

      // if (response?.data?.id) {
      //   const body = {
      //     first_name: firmName,
      //     last_name: lastName,
      //     card_no: cardNumber,
      //     cvc: cvc,
      //     expiry_date: expiryDate,
      //     card_type: cardType,
      //   };
      //   const AddCard = await post('/user/card', body);

      // console.log("AddCard~~~~", AddCard);
      // ToastAndroid.show("Order Placed", ToastAndroid.SHORT);
      // props.navigation.navigate('PaymentApproval', response.data);
      // dispatch(storeCart([]));
      // await AsyncStorage.removeItem('CartData');

      // setLoader(false);
      // } else {
      // alert('Something went wrong');
      // setLoader(false);
      // })
      // } else {
      // Alert.alert('Payment Failed');
      // setLoader(false);
      // }
    });
  };

  const makePayment = async () => {
    let pament_data = await charges();
    console.log('pament_data~~~~', pament_data);
    if (pament_data.error) {
      Alert.alert(pament_data.error.message);
      return;
    }
    let clientsecret = pament_data.client_secret;
    const initializeSheet = await initPaymentSheet({
      paymentIntentClientSecret: clientsecret,
      merchantDisplayName: 'Merchant Name',
      // customFlow: true,
    });

    console.log('error::', initializeSheet);
    if (initializeSheet.error) {
      Alert.alert(initializeSheet.error.message);
      return;
    }
    const PresentSheet = await presentPaymentSheet({
      clientsecret,
    });
    if (PresentSheet.error) {
      Alert.alert(PresentSheet.error.message);
      return;
    } else {
      Alert.alert('Your payment has been verified');
    }
    console.log('PresentSheet::', PresentSheet);

    // if (firstName == '') {
    //   Alert.alert('Please Enter First Name');
    // } else if (cardNumber.length === 0 || cardNumber === '') {
    //   Alert.alert('Invalid Credit Card');
    //   return false;
    // } else if (
    //   cardValidator.number(cardNumber).card.niceType !== 'Visa' &&
    //   cardValidator.number(cardNumber).card.niceType !== 'Mastercard'
    // ) {
    //   Alert.alert('Please Enter valid Card Number');
    // } else if (expiryDate.length === 0) {
    //   Alert.alert('Please Add Expiry date');
    // } else if (cvvCode.length !== 3) {
    //   Alert.alert('Please Enter CVC');
    // } else {
    //   let creditCardToken;
    //   try {
    //     creditCardToken = await getCreditCardToken();
    //     console.log('creditCardToken :::', JSON.stringify(creditCardToken));
    //   } catch (e) {
    //     return e;
    //   }

    //   const {error} = await subscribeUser(creditCardToken);
    //   console.log('subscribeUser error :::', error);

    //   if (error) {
    //     Alert.alert(error);
    //   } else {
    //     let pament_data = await charges();

    //     console.log('pament_data~~~~', pament_data);

    //     const cardData = await confirmPayment(pament_data.client_secret, {
    //       paymentMethodType: 'Card',
    //       paymentMethodData: {
    //         paymentMethodId: pament_data.id,
    //       },
    //     });
    //     console.log('cardData~~~~~', cardData);
    //     // let pament_data_con = await chargesConfirm(pament_data.id);
    //   }
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 40}
        style={{ flex: 1 }}>
        <Text style={styles.payment_tex}>Payment</Text>
        <View style={{ marginVertical: 5 }}>
          <Text style={styles.title_text}>Full Name</Text>
          <TextInput
            style={styles.textinpute}
            onChangeText={val => setFirstName(val)}
            value={firstName}
            placeholder="Enter Full Name"
            placeholderTextColor="#9C9D9C"
          />
        </View>
        {/* <View style={{marginVertical: 5}}>
          <Text style={styles.title_text}>Last Name</Text>
          <TextInput
            style={styles.textinpute}
            onChangeText={val => setLastName(val)}
            value={lastName}
            placeholder="Enter Last Name"
            placeholderTextColor="#9C9D9C"
          />
        </View> */}
        <View style={{ marginVertical: 5 }}>
          <Text style={styles.title_text}>Card Number</Text>
          <TextInput
            style={styles.textinpute}
            maxLength={16}
            keyboardType="numeric"
            onChangeText={val => onChangeCardNumber(val)}
            value={cardNumber}
            placeholder="Enter Last Name"
            placeholderTextColor="#9C9D9C"
          />
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text style={styles.title_text}> Expiry Date</Text>
          <TextInput
            style={styles.textinpute}
            maxLength={5}
            onChangeText={val => setExpiryDate(val)}
            value={expiryDate}
            placeholder="Enter Expiry Date"
            placeholderTextColor="#9C9D9C"
          />
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text style={styles.title_text}> CVV</Text>
          <TextInput
            style={styles.textinpute}
            maxLength={3}
            keyboardType="numeric"
            onChangeText={val => setCvvCode(val)}
            value={cvvCode}
            placeholder="Enter CVV"
            placeholderTextColor="#9C9D9C"
          />
        </View>
        <TouchableOpacity
          style={{
            width: '100%',
            marginTop: 50,
            backgroundColor: '#FFB31F',
            borderRadius: 30,
            height: '8%',
            justifyContent: 'center',
          }}
          onPress={() => makePayment()}>
          <View>
            <Text style={styles.makePayment_text}>Make Payment</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default PaymentPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 15,
  },
  payment_tex: {
    marginVertical: 20,
    fontSize: 30,
    color: 'black',
    fontFamily: 'Ubuntu',
    fontWeight: '700',
    alignSelf: 'center',
  },
  textinpute: {
    borderRadius: 10,
    backgroundColor: '#FFFBF3',
    elevation: 2,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.27,
    shadowRadius: 5,
    justifyContent: 'center',
    marginVertical: 5,
    color: 'black',
    padding: 10,
    marginHorizontal: 7,
  },
  title_text: {
    fontWeight: '500',
    color: '#9C9D9C',
  },
  makePayment_text: {
    textAlign: 'center',
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Ubuntu',
    fontWeight: '700',
  },
});
