import React, { Component } from "react";
import { Image, View, TouchableOpacity, TextInput, Text, Modal, Alert, Pressable } from "react-native";
import CheckBox from '@react-native-community/checkbox'
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./styles";

const data = [
  { label: 'India (+91)', value: '+91' },
  { label: 'America (+1)', value: '+1' },

];


export class step3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSteps: "",
      currentStep: "",
      phoneNumber: '',
      value: null,
      isFocus: false,
      isSelected: false,
      modalVisible: false,
      user_email:'',
      user_firstName:'',
      user_address:'',
      user_countrycode:'',
      user_phoneno:''
    };
  }

  static getDerivedStateFromProps = props => {
    const { getTotalSteps, getCurrentStep } = props;
    return {
      totalSteps: getTotalSteps(),
      currentStep: getCurrentStep()
    };
  };

  renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  nextStep = () => {
    const { saveState } = this.props;
    if (this.state.isSelected == false) {
      alert('Please check acceptTermsAndCondition')
    } else {
      if (this.state.value == null) {
        alert('Please select country Code')
      } else {
        if (this.state.phoneNumber == '') {
          alert('Please enter phoneNumber')
        } else {
          if (this.state.phoneNumber.match("^[0-9]{10}$")) {
            saveState({ countrycode: this.state.value, phoneno: this.state.phoneNumber });
            AsyncStorage.setItem('countrycode', this.state.value);
            AsyncStorage.setItem('phoneno', this.state.phoneNumber);
            console.log('0ooooooooooooooooooooookkkk')
            this.modalOpen()
            this.props.next
          } else {
            alert('Please enter 10 digit number')
          }
        }
      }
    }
    //this.props.next
  }
  modalOpen = async() =>{
    try{  
      let user_email = await AsyncStorage.getItem('email');  
      let user_firstName = await AsyncStorage.getItem('firstName');
      let user_address = await AsyncStorage.getItem('address');
      let user_countrycode = await AsyncStorage.getItem('countrycode');
      let user_phoneno = await AsyncStorage.getItem('phoneno');

      
      this.setState({user_email: user_email})
      this.setState({user_firstName: user_firstName})
      this.setState({user_address: user_address})
      this.setState({user_countrycode: user_countrycode})
      this.setState({user_phoneno: user_phoneno})
    }  
    catch(error){  
      alert(error)  
    }  
    this.setState({modalVisible:true})
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
        <Dropdown
          style={[styles.dropdown, this.state.isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!this.state.isFocus ? 'Select Country Code' : '...'}
          searchPlaceholder="Search..."
          value={this.state.value}
          onFocus={() => this.setState({ isFocus: true })}
          onBlur={() => this.setState({ isFocus: false })}
          onChange={item => {
            this.setState({ value: item.value });
            this.setState({ isFocus: false });
          }}
        />
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ phoneNumber: text })}
          value={this.state.phoneNumber}
          placeholder={"Phone Number"}
          placeholderTextColor="#fff"
        />
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={this.state.isSelected}
            onValueChange={(newValue) => this.setState({ isSelected: newValue })}
            style={styles.checkbox}
          />
          <Text style={styles.label}>AcceptTermsAndCondition</Text>
        </View>
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
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              this.setState({modalVisible:!this.state.modalVisible});
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Email : {this.state.user_email}</Text>
                <Text style={styles.modalText}>First Name: {this.state.user_firstName}</Text>
                <Text style={styles.modalText}>Address: {this.state.user_address}</Text>
                <Text style={styles.modalText}>Country Code: {this.state.user_countrycode}</Text>
                <Text style={styles.modalText}>Phone Number: {this.state.user_phoneno}</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => this.setState({modalVisible:!this.state.modalVisible})}>
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          
        </View>
      </View>
    );
  }
}

export default step3;

