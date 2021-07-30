import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios'

const Trying = () => {
    const [chart2, setChart2] = useState('')
    const chart = () => {
        let office = [];
        let maintenance = [];
        let leasing = [];
        let others = [];
        let salaires = [];
        axios.get('/api/expenses/forchart')
            .then(res => {
                console.log('response', res.data.data)
                for (const property in res.data.data) {
                    // const cc = `${property}: ${expenses.data[property]}`;
                    if (`${property}` === 'Bureau') {
                        office = `${res.data.data[property]}`
                    } else if (`${property}` === 'Leasing') {
                        leasing = `${res.data.data[property]}`
                    } else if (`${property}` === 'Salaires') {
                        salaires = `${res.data.data[property]}`
                    } else if (`${property}` === 'Maintenance') {
                        maintenance = `${res.data.data[property]}`
                    } else {
                        others = `${res.data.data[property]}`
                    }
                }
                setChart2({
                    labels: ['office', 'leasing', 'salaires', 'maintenance', 'others'],
                    datasets: [
                        {
                            label: '# of Votes',
                            data: [office, leasing, salaires, maintenance, others],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)'
                            ],
                            borderWidth: 1,
                        },
                    ],
                })
            }
            )
    }

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    useEffect(() => {
        chart()
    }, [])

    return (
        <>
            <Bar data={chart2} options={options} />
        </>
    )
};

export default Trying;