import React, { Component } from "react";
import { Image, View, TouchableOpacity, TextInput, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./styles";

class step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSteps: "",
      currentStep: "",
      emailId: '',
      password: ''
    };
  }

  static getDerivedStateFromProps = props => {
    const { getTotalSteps, getCurrentStep } = props;
    return {
      totalSteps: getTotalSteps(),
      currentStep: getCurrentStep()
    };
  };

  validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  nextStep = () => {
    const { next, saveState } = this.props;

    console.log(this.state.emailId)
    console.log(this.state.password)
    if (this.state.emailId == '') {
      alert('Please enter email')
    } else if (this.state.password == '') {
      alert('Please enter password')
    }

    if (this.state.emailId.toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )) {

      if (this.state.password.match("^(.*?[A-Z]){2,}")) {
        if (this.state.password.match("^(.*?[a-z]){2,}")) {
          if (this.state.password.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {

            // Save state for use in other steps
            saveState({ email: this.state.emailId });
            AsyncStorage.setItem('email',this.state.emailId);

            // Go to next step
            next();
          } else {
            alert('Please enter special characters')
          }
        } else {
          alert('Minimum 2 small letters required')
        }
      } else {
        alert('Minimum 2 capital letters required')
      }
    } else {
      alert('Please enter valid email')
    }
  };

  goBack() {
    const { back } = this.props;
    // Go to previous step
    back();
  }

  render() {
    const { currentStep, totalSteps } = this.state;
    return (
      <View style={[styles.container, styles.step1]}>
        <View>
          <Text
            style={styles.currentStepText}
          >{`Step ${currentStep} of ${totalSteps}`}</Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ emailId: text })}
          value={this.state.emailId}
          placeholder={"Email Id"}
          placeholderTextColor="#fff"
        />
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password}
          placeholder={"Password"}
          placeholderTextColor="#fff"
        />
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={this.nextStep} style={styles.btnStyle}>
            <Image
              source={require("../assets/icons/arrow.png")}
              style={styles.btnImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default step1;
