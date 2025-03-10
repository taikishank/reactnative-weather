import React from "react";
import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator, Image } from "react-native";
import { ForecastParams, LocationParams } from "../shared/interfaces";
import { fetchLocations, fetchWeatherForecast } from "../utils/weatherAPI";

export default function WeatherDisplay({ cityName }: { cityName: string }) {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [temperature, setTemperature] = useState<number | null>(null);
    const [condition, setCondition] = useState<string | null>(null);
    const [icon, setIcon] = useState<string | null>(null);

    useEffect(() => {
        const getWeather = async() =>{
            try{
                setLoading(true);
                setError(null);
                const params: ForecastParams = {cityName, days: 3};
                const data = await fetchWeatherForecast(params);
                if (data){
                    setTemperature(data.current.temp_f);
                    setCondition(data.current.condition.text_entry);
                    setIcon('https:${data.current.condition.icon}');
                }
                else
                    setError("Failed to fetch weather data");
            }
            catch (err){
                setError("An error occured while attempting to fetch data");
            }
            finally{
                setLoading(false);
            }
        };
        getWeather();
    }, [cityName]);
    return(
        <View style={styles.location}>
            {loading ? (
                <ActivityIndicator size = "large" color = "#0000ff" />
            ) : error ?  (
                <Text>{error}</Text>
            ) : cityName && temperature !== null && icon ? (
                <View style={styles.weatherContainer}>
                    <Text>City: {cityName} Temperature: {temperature}°F</Text>
                    <Text style={styles.conditionText}>{condition}</Text>
                    <Image source={{uri : icon}} style = {styles.weatherIcon}/>
                </View>
            ) : (
                <Text>No data available</Text>
            )}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
      paddingTop: 70,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f0f0f0",
    },
    weatherContainer: {
        alignContent: "center",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      justifyContent: "center",
    },
    text_entry: {
      fontSize: 16,
      color: "#333",
      alignContent: "center",
    },
    separator: {
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 20,
      paddingTop: 80,
      fontSize: 80,
    },
    location: {
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 20,
    },
    conditionText: {
        fontSize: 16,
        fontStyle: "italic",
    },
    weatherIcon: {
        width: 64,
        height: 64,
        marginTop: 10,
    }
});