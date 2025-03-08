import React, { useState, useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import { fetchWeatherForecast } from "../utils/weatherAPI";
export default function TemperatureDisplay({ cityName }: { cityName: string }) {   
    const [temperature, setTemperature] = useState(0);
    useEffect(() => {
        (async () => {
        const data = await fetchWeatherForecast({ cityName, days: 1 });
        setTemperature(data.current.temp_f);
        })();
    }, [cityName]);
    return (
        <Text style={styles.temperature}>{temperature}°</Text>
    );
}

const styles = StyleSheet.create({
    temperature: {
    fontSize: 160,
    color: "white",
    textAlign: "center"
    },
});
