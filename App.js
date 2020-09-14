import React, {Component} from 'react';
import { StyleSheet, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import RNOtpVerify from 'react-native-otp-verify';

export default class Home extends Component {
  state = {
    text: ''
  };

  async componentDidMount() {
    RNOtpVerify.getOtp()
      .then(p => RNOtpVerify.addListener(this.otpHandler))
      .catch(p => console.log(p));

    await this.getHash();
  }

  getHash = () =>
    RNOtpVerify.getHash()
      .then(console.log)
      .catch(console.log);

  otpHandler = (message) => {
    this.onChangeText(message.replace(/\D/g, '').substr(0,4))
    console.log('SMS :: ',message)
  }

  onChangeText = (value)=> {
    this.setState({
      text: value
    })
  }

//   _onPhoneNumberPressed = async () => {
//     try {
//       const phoneNumber = await SmsRetriever.requestPhoneNumber();
//     } catch (error) {
//       console.log(JSON.stringify(error));
//     }
//   };
//
// // Get the SMS message (second gif)
//   _onSmsListenerPressed = async () => {
//     try {
//       const registered = await SmsRetriever.startSmsRetriever();
//       if (registered) {
//         await SmsRetriever.addSmsListener(event => {
//           console.log(event.message);
//           this.onChangeText(event.message.replace(/\D/g, ''))
//
//           SmsRetriever.removeSmsListener();
//         });
//       }
//     } catch (error) {
//       console.log(JSON.stringify(error));
//     }
//   };

  render() {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic"
                  contentContainerStyle= {styles.scrollView}>

        <Text>Enter One Time Password</Text>
        <TextInput style= {styles.textInput}
                   placeholder = "OTP"
                   autoFocs
                   onChangeText= {this.onChangeText}
                   value= {this.state.text} />
        <TouchableOpacity onPress={() => {}}>
          <Text>Enter</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    marginTop: 20,
    width:  200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  }
});