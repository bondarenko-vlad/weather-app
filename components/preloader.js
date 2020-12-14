import React from "react";
import { View, ImageBackground } from "react-native";

const Preloader = () => {
    return <View >
      <ImageBackground source={require('../cloud.gif')} style={{width:'40%', height:'50%'}}></ImageBackground>
    </View>
  }
  export default Preloader



