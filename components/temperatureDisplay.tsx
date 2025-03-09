import React, { useState, useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import { fetchWeatherForecast } from "../utils/weatherAPI";
import { ForecastParams } from "../shared/interfaces";

interface TemperatureDisplayProps {
    cityName: string;
    setIcon: (icon:string) => void;
    setCondition: (condition:string) => void;
}

export default function TemperatureDisplay({ cityName, setIcon, setCondition }: TemperatureDisplayProps ) {   
    const [temperature, setTemperature] = useState(0);
    useEffect(() => {
        (async () => {
        const data = await fetchWeatherForecast({ cityName, days: 1 });
        setTemperature(data.current.temp_f);
        setIcon(`https:${data.current.condition.icon}`);
        setCondition(data.current.condition.text);
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
