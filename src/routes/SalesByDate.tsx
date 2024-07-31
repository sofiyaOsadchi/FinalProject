import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './SalesByDate.scss';
import analyticsService from '../services/analytics';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesChart = () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
    const [endDate, setEndDate] = useState<Date | null>(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0));
    const [salesData, setSalesData] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSalesData = async () => {
        if (!startDate || !endDate) return;

        setLoading(true);
        setError(null);
        try {
            const response = await analyticsService.getSalesByDate(startDate.toISOString(), endDate.toISOString());
            const salesByDate = response.data.salesByDate;

            const dates = salesByDate.map((sale: any) => sale._id.split('T')[0]); // פורמט YYYY-MM-DD
            const totalAmounts = salesByDate.map((sale: any) => sale.totalAmount);
            const totalSales = salesByDate.map((sale: any) => sale.totalSales);

            setSalesData({
                labels: dates,
                datasets: [
                    {
                        label: 'Total Amount',
                        data: totalAmounts,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        yAxisID: 'y1',
                        tension: 0.1, // ליצירת קווים חלקים
                    },
                    {
                        label: 'Total Sales',
                        data: totalSales,
                        borderColor: 'rgba(153, 102, 255, 1)',
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        yAxisID: 'y2',
                        tension: 0.1, // ליצירת קווים חלקים
                        pointBackgroundColor: 'rgba(153, 102, 255, 1)',
                    },
                ],
            });
        } catch (error) {
            setError('Failed to fetch sales data');
            console.error('Failed to fetch sales data', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSalesData();
    }, [startDate, endDate]);

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem: any) {
                        if (tooltipItem.dataset.label === 'Total Sales') {
                            return `${tooltipItem.dataset.label}: ${tooltipItem.formattedValue}`;
                        } else {
                            return `${tooltipItem.dataset.label}: $${tooltipItem.formattedValue}`;
                        }
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date'
                },
                grid: {
                    drawOnChartArea: false, // removes the vertical grid lines
                },
            },
            y1: {
                type: 'linear' as const,
                position: 'left' as const,
                title: {
                    display: true,
                    text: 'Total Amount'
                },
                ticks: {
                    callback: function (value: number) {
                        return `$${value}`;
                    }
                }
            },
            y2: {
                type: 'linear' as const,
                position: 'right' as const,
                title: {
                    display: true,
                    text: 'Total Sales'
                },
                ticks: {
                    callback: function (value: number) {
                        return `${value}`;
                    },
                    color: 'rgba(153, 102, 255, 1)' // שינוי צבע המספרים לסגול
                },
                grid: {
                    drawOnChartArea: false
                }
            }
        }
    };

    return (
        <div className="sales-chart-container">
            <h2 className="chart-title">Sales by Date</h2>
            <div className="date-picker-container">
                <DatePicker
                    selected={startDate}
                    onChange={(date: Date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Select start date"
                    dateFormat="yyyy-MM-dd"
                    className="date-picker"
                />
                <DatePicker
                    selected={endDate}
                    onChange={(date: Date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    placeholderText="Select end date"
                    dateFormat="yyyy-MM-dd"
                    className="date-picker"
                />
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : salesData.labels && salesData.labels.length > 0 ? (
                <div className="chart-wrapper">
                    <Line data={salesData} options={chartOptions} />
                </div>
            ) : (
                <p>No data available for the selected dates.</p>
            )}
        </div>
    );
};

export default SalesChart;
