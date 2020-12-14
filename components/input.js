import React from 'react'
import {TextInput, StyleSheet} from "react-native"


const Input = (props) => {
    const searchCity = () =>{
      props.setCity()
      props.setText('')  
    }
    return <TextInput defaultValue={text} 
    onChangeText={(text)=>{props.setText(text)}} 
    placeholder='find the city' 
    onEndEditing={searchCity} style={styles.input} ></TextInput>
  }
  export default Input


  const styles = StyleSheet.create({
    input:{
      backgroundColor:'white',
      padding:20,
      fontSize: 20,
      width:'50%',
      borderRadius:5,
      borderColor:'black',
      borderWidth:2,
      borderStyle:'solid',
      marginLeft:'auto',
      marginRight:'auto',
      marginTop:'10%'
    }
  });