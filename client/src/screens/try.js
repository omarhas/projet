import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import axios from 'axios'
const Try = () => {
    const [montant, setMontant] = useState(null)
    const montantnet = () => {
        axios.get('/api/contrat/montant')
            .then(res => {
                setMontant(res.data.montant)
            }
            )
    }

    const [margeData, setMargeData] = useState('')
    const difference = () => {
        setMargeData({
            labels: ["M", "T", "W", "T", "F", "S", "S"],
            datasets: [
                {
                    label: 'Revenus',
                    data: montant,
                    fill: false,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgba(255, 99, 132, 0.2)',
                    yAxisID: 'y-axis-1',
                },
                {
                    label: 'Dépenses',
                    data: [1, 2, 1, 1, 2, 2],
                    fill: false,
                    backgroundColor: 'rgb(54, 162, 235)',
                    borderColor: 'rgba(54, 162, 235, 0.2)',
                    yAxisID: 'y-axis-2',
                },
            ],
        })
    }

    useEffect(() => {
        difference();
        montantnet();
    }, [])

    return (
        <Line data={margeData} width={600} height={250}></Line>
    )
}

export default Try