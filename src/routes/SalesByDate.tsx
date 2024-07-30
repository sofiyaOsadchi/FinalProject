// SalesPage.tsx
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import salesService from '../services/analytics';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './SalesByDate.scss'; 

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesPage = () => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [salesData, setSalesData] = useState<{ date: string; totalAmount: number; totalSales: number }[]>([]);

    useEffect(() => {
        const fetchSalesData = async () => {
            if (startDate && endDate) {
                try {
                    const response = await salesService.getSalesByDate(startDate, endDate);
                    setSalesData(response.data.salesByDate);
                } catch (err) {
                    console.error('Error fetching sales data:', err);
                }
            }
        };

        fetchSalesData();
    }, [startDate, endDate]);

    const chartData = {
        labels: salesData.map(item => item.date),
        datasets: [
            {
                label: 'Total Amount',
                data: salesData.map(item => item.totalAmount),
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
            },
            {
                label: 'Total Sales',
                data: salesData.map(item => item.totalSales),
                fill: false,
                backgroundColor: 'rgba(153,102,255,0.2)',
                borderColor: 'rgba(153,102,255,1)',
            },
        ],
    };

    return (
        <div className="sales-page">
            <h1>Sales Analytics</h1>
            <div className="date-picker-container">
                <DatePicker
                    selected={startDate}
                    onChange={setStartDate}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Select start date"
                />
                <DatePicker
                    selected={endDate}
                    onChange={setEndDate}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Select end date"
                />
            </div>
            <div className="chart-container">
                <Line data={chartData} />
            </div>
        </div>
    );
};

export default SalesPage;
