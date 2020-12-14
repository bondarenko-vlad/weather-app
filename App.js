import React from "react";
import { StyleSheet, Text, View, ImageBackground, TextInput } from "react-native";
import Preloader from './components/preloader'
import Input from './components/input'
import { useState } from "react";

 class CityScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      main: "",
      city: "London",
      description: "",
      wind: "",
      isFetch: false

    }  
  }
  setCity(){
    this.state.city = this.props.text
    this.getWeather()
    this.forceUpdate()
  }
  getWeather(){
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&lang=en&APPID=675a6f1f0e4160179b80a9177f7c345d`
    ).then((res) => {
      if (res.status !== 200) {
        console.log(res.status);
        return
      }
      res
        .json()
        .then((data) => {
          console.log(data);
          this.setState({
            main: data.main,
            city: data.name,
            description: data.weather[0],
            wind: data.wind,
          })
        })
        .catch((err) => console.log(err));
    })
  }


  componentDidMount() {
    this.getWeather()
    this.state.isFetch = true
  }
  render() {
    return (
      <View style={styles.container}>

        {this.state.isFetch?<ImageBackground
          source={require("./bg.jpg")}
          style={{ width: "100%", height: "100%" }}
        >
          <Text style={styles.h}>{this.state.city}</Text>
          <Text style={styles.desc}>{this.state.description.description}</Text>
          <Text style={styles.temp}>
            {Math.round(this.state.main.temp - 273.15)} С
          </Text>
          <View style={styles.minmax}>
            <Text style={styles.mm}>min: {Math.floor(this.state.main.temp_min - 273.15)} C</Text>
            <Text style={styles.mm}>max: {Math.ceil(this.state.main.temp_max - 273.15)} C</Text>
          </View>
          <Text style={styles.desc}>Humidity: {this.state.main.humidity} %</Text>
          <Text style={styles.desc}>Wind speed: {this.state.wind.speed} m/s</Text>
          <Input setCity={this.setCity.bind(this)} text={this.props.text} setText={this.props.setText} />
        </ImageBackground>: <Preloader style={{ width: "100%", height: "100%" }} /> }

      </View>
    );
  }
}

export default function App() {
  [text, setText] = useState('')
  return (
    <CityScreen text={text} setText={setText} />
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent:'center',
    
    
  },
  h: {
    margin: "10%",
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    color: "#ddd",
  },
  temp: {
    fontSize: 60,
    textAlign: "center",
    color: "#fff",
  },
  desc: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    margin:10
  },
  minmax:{
    flexDirection:'row',
    justifyContent:'space-around'
  },
  mm:{
    color:'#fff',
    width:'20%',
    textAlign:'center',
    fontSize:18
  }
});
