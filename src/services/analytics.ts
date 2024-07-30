import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/v1/analytics';

const getSalesByDate = (startDate: string, endDate: string) => {
    return axios.get(`${baseUrl}/sales-by-date`, {
        params: { startDate, endDate },
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        }
    });
};


const analyticsService = { getSalesByDate };

export default analyticsService;