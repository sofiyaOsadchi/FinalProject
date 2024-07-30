// salesService.ts
import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/v1';

const getSalesByDate = (startDate: Date, endDate: Date) => {
    return axios.get(`${baseUrl}/sales-by-date`, {
        params: { startDate: startDate.toISOString(), endDate: endDate.toISOString() },
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        }
    });
};

const salesService = { getSalesByDate };

export default salesService;
