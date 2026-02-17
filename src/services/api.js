import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

const apiClient = axios.create({
    baseURL: BASE_URL,
    params: {
        key: API_KEY,
    },
});

export const weatherService = {
    getCurrentWeather: async (query) => {
        try {
            const response = await apiClient.get('/current.json', {
                params: { q: query, aqi: 'yes' },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching current weather:', error);
            throw error;
        }
    },

    getForecast: async (query, days = 3) => {
        try {
            const response = await apiClient.get('/forecast.json', {
                params: { q: query, days, aqi: 'yes', alerts: 'yes' },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching forecast:', error);
            throw error;
        }
    },

    getHistory: async (query, dt) => {
        try {
            const response = await apiClient.get('/history.json', {
                params: { q: query, dt },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching history:', error);
            throw error;
        }
    },

    searchLocations: async (query) => {
        try {
            const response = await apiClient.get('/search.json', {
                params: { q: query },
            });
            return response.data;
        } catch (error) {
            console.error('Error searching locations:', error);
            throw error;
        }
    },

    getAstronomyData: async (query) => {
        try {
            const response = await apiClient.get('/astronomy.json', {
                params: { q: query },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching astronomy data:', error);
            throw error;
        }
    },

    getSportsData: async (query) => {
        try {
            const response = await apiClient.get('/sports.json', {
                params: { q: query },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching sports data:', error);
            throw error;
        }
    },
};
