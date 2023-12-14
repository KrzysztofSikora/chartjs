import axios from 'axios';


const API_URL = 'http://localhost:4000/v1';

const ApiService = {

    async getDataChart() {
        try {
            const response = await axios.get(`${API_URL}/locations`);
            return response.data.map((location => {
                return {
                    lat: location.latitude,
                    lng: location.longitude
                }
            }))

        } catch (error) {
            console.error('Error:', error);
        }

    },

};

export default ApiService;