
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import AnimatedMultistep from "react-native-animated-multistep";

/* Define the steps  */

import Step1 from "./steps/step1";
import Step2 from "./steps/step2";
import Step3 from "./steps/step3";

const allSteps = [
  { name: "step 1", component: Step1 },
  { name: "step 2", component: Step2 },
  { name: "step 3", component: Step3 },

];

/* Define your class */
export default class App extends Component {
  /* define the method to be called when you go on next step */

  onNext = () => {
    console.log("Next");
  };

  /* define the method to be called when you go on back step */

  onBack = () => {
    console.log("Back");
  };

  /* define the method to be called when the wizard is finished */

  finish = finalState => {
    console.log('iiiiiiii')
    console.log(finalState);
  };

  /* render MultiStep */
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#1dd1a1" }}>
      <View style={styles.upperContainer}>
        <Text style={styles.loginText}>Register</Text>
      </View>
      <View style={styles.lowerContainer}>
        <AnimatedMultistep
          steps={allSteps}
          onFinish={this.finish}
          animate={true}
          onBack={this.onBack}
          onNext={this.onNext}
        />
      </View>
    </View>
    );
  }
}
const styles = StyleSheet.create({
  upperContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  loginText: {
    fontSize: 32,
    color: "#fff"
  },
  lowerContainer: {
    flex: 2
  }
});