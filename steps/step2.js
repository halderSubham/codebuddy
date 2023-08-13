import React, { Component } from "react";
import { Image, View, TouchableOpacity, TextInput, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./styles";

export class step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSteps: "",
      currentStep: "",
      firstName: '',
      lastName: '',
      allgood: false
    };
  }

  static getDerivedStateFromProps = props => {
    const { getTotalSteps, getCurrentStep } = props;
    return {
      totalSteps: getTotalSteps(),
      currentStep: getCurrentStep()
    };
  };

  nextStep = () => {
    const { next, saveState } = this.props;

    // console.log(this.state.firstName)
    // console.log(this.state.lastName)
    // console.log(this.state.address)
    if (this.state.firstName == '') {
      this.setState({ allgood: false })
      alert('Please enter First name')
    } else {
      if (this.state.firstName.length <= 50 && this.state.firstName.length >= 2) {
        this.setState({ allgood: true })
        if (this.state.address == '') {
          this.setState({ allgood: false })
          alert('Please enter Address')
        } else {
          if (this.state.address?.length >= 10) {
            this.setState({ allgood: true })

          } else {
            this.setState({ allgood: false })
            alert("make sure the address minimum length 10")
          }
        }
      } else {
        this.setState({ allgood: false })
        alert("make sure the firstname is between 2-50 characters long")
      }
    }


    if (this.state.allgood == true) {
      saveState({ firstName: this.state.firstName, address:this.state.address });
      AsyncStorage.setItem('firstName',this.state.firstName);
      AsyncStorage.setItem('address',this.state.address);
      next();
    }

  };

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
          onChangeText={text => this.setState({ firstName: text })}
          value={this.state.firstName}
          placeholder={"First Name"}
          placeholderTextColor="#fff"
        />
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ lastName: text })}
          value={this.state.lastName}
          placeholder={"Last Name"}
          placeholderTextColor="#fff"
        />
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ address: text })}
          value={this.state.address}
          placeholder={"Address"}
          placeholderTextColor="#fff"
        />
        <View style={[styles.btnContainer, styles.marginAround]}>
          <TouchableOpacity onPress={this.props.back} style={styles.btnStyle}>
            <Image
              source={require("../assets/icons/arrow.png")}
              style={[styles.btnImage, styles.backBtn]}
              resizeMode="cover"
            />
          </TouchableOpacity>
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

export default step2;
