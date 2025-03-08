import React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import WeatherDisplay from "../components/weatherDisplay";
import SearchBar from "../components/searchBar";
import CityDisplay from "../components/cityDisplay";
import TemperatureDisplay from "../components/temperatureDisplay";
import { fetchLocations, fetchWeatherForecast } from "../utils/weatherAPI";
import { ForecastParams, LocationParams } from "../shared/interfaces";

export default function FrontScreen(){
  const [cityName, setCityName] = useState<string>("");
    return(
        <View style={styles.container}>
            <View style={styles.horizontalLine}></View>
            <Text style={styles.title}>Weather</Text>
            <View style={styles.search_bar}>
              <SearchBar onSearch={setCityName}/>
            </View>
            <View style={styles.horizontalLine}></View>
            <Image 
                source = {require("../assets/cloud_sun.png")}
                style = {styles.image}
            />
            <TemperatureDisplay cityName={cityName}/>
            <View style={styles.horizontalLine}></View>
            <CityDisplay cityName={cityName}/>
            <View style={styles.horizontalLine}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 70,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "teal",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      justifyContent: "center",
      color: "white",
    },
    search_bar: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "gray",
      width: "90%",
      marginVertical: 10,
      alignSelf: "center",
      borderRadius: 5,
      height: 50,
    },
    image: {
      width: 200,
      height: 200,
    },
    temp:{
      fontSize: 160,
      color: "white",
      paddingTop: 50,
    },
    horizontalLine: {
      height: 3,
      backgroundColor: "white",
      width: "100%",
      marginVertical: 10,
    },
    location:{
      fontSize: 50,
      color: "white",
    },
   });
   