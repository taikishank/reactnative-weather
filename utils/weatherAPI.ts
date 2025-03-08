import axios from "axios";
import { apiKey } from "../constants"
import { ForecastParams, LocationParams } from "../shared/interfaces";

const ForecastEndpoint = (params: ForecastParams): string => {
    return `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`
};
const locationsEndpoint = (params: LocationParams): string => {
    return `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`
};

const apiCall = async (endpoint: string) => {
    const options = {
        method: 'GET',
        url: endpoint
    }
    try{
        const response = await axios.request(options);
        return response.data;
    }
    catch(err){
        console.log('error: ', err);
        return null;
    }
}

export const fetchWeatherForecast = (params: ForecastParams) => {
    return apiCall(ForecastEndpoint(params));
}
    
export const fetchLocations = (params: LocationParams) =>{
    return apiCall(locationsEndpoint(params));
}
