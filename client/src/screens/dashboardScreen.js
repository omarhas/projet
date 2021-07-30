import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';
import { Button, Container, Row, Col } from 'react-bootstrap';
import './dashboardScreen.css';
import people from '../pic/people.png'
import clock from '../pic/clock.png'
import enpanne from '../pic/enpanne.png'
import dispo from '../pic/dispo.png'
import louee from '../pic/louee.png'
import reservee from '../pic/reservee.png'
import { listTeam } from '../actions/teamActions';
import axios from 'axios'
import { Doughnut, Line, Bar } from "react-chartjs-2";

const DashboardScreen = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const teamList = useSelector(state => state.teamList)
    const { numberofusers } = teamList

    const [chartData, setChartData] = useState('')
    const [Disponible, setDisponible] = useState(null);
    const [Enpanne, setEnpanne] = useState(null);
    const [Reservee, setReservee] = useState(null);
    const [Louee, setLouee] = useState(null);
    const [allExpenses, setAllExpenses] = useState(null)
    const [barChart, setBarChart] = useState('')
    const [office, setOffice] = useState([])
    const [maintenance, setMaintenance] = useState([])
    const [leasing, setLeasing] = useState([])
    const [others, setOthers] = useState([])
    const [salaires, setSalaires] = useState([])

    const barr = () => {
        let office = [];
        let maintenance = [];
        let leasing = [];
        let others = [];
        let salaires = [];
        axios.get('/api/expenses/forchart')
            .then(res => {
                console.log('response', office)
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
                setBarChart({
                    labels: ['Ja', 'Fe', 'Ma', 'Av', 'Ma', 'Ju'],
                    datasets: [
                        {
                            label: 'Revenu',
                            data: [office, leasing, salaires, maintenance, others, office],
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
        responsive: true,
        layout: {
            padding: {
                top: 5,
                left: 15,
                right: 15,
                bottom: 15
            },
        },
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
    const chart = () => {
        let office = 0;
        let maintenance = 0;
        let leasing = 0;
        let others = 0;
        let salaires = 0;
        axios
            .get('/api/expenses/forchart')
            .then(res => {
                for (const property in res.data.data) {
                    if (`${property}` === 'Bureau') {
                        office = res.data.data[property]
                    } else if (`${property}` === 'Leasing') {
                        leasing = res.data.data[property]
                    } else if (`${property}` === 'Salaires') {
                        salaires = res.data.data[property]
                    } else if (`${property}` === 'Maintenance') {
                        maintenance = res.data.data[property]
                    } else if (`${property}` === 'Autres') {
                        others = res.data.data[property]
                    }
                }
                for (const property in res.data.data) {
                    if (`${property}` === 'all') {
                        setAllExpenses(res.data.data[property])
                        console.log('obj', res.data.data[property])
                    }
                }
                setChartData({
                    labels: ['Bureau', 'Leasing', 'Salaires', 'Maintenance', 'Autres'],
                    datasets: [
                        {
                            data: [office, leasing, salaires, maintenance, others],
                            backgroundColor: [
                                "rgb(229,104,56)",
                                "rgb(105,66,209)",
                                "rgb(239,191,61)",
                                "rgb(175,72,152)",
                                "rgb(89,180,189)",
                            ],
                            borderWidth: 2,
                            borderColor: [
                                "rgb(229,104,56)",
                                "rgb(105,66,209)",
                                "rgb(239,191,61)",
                                "rgb(175,72,152)",
                                "rgb(89,180,189)",
                            ]
                        }
                    ]
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
    const [montant, setMontant] = useState(null)
    const montantnet = () => {
        axios.get('/api/contrat/montant')
            .then(res => {
                setMontant(res.data.montant)
            }
            )
    }

    var datta = [
        {
            type: '家具家电',
            sales: 38,
        },
        {
            type: '粮油副食',
            sales: 52,
        },
        {
            type: '生鲜水果',
            sales: 61,
        },
    ];

    var configg = {
        data: datta,
        xField: 'type',
        yField: 'sales',
        label: {
            position: 'middle',
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        meta: {
            type: { alias: '类别' },
            sales: { alias: '销售额' },
        },
    };


    // const asyncFetch = () => {
    //     fetch('https://gw.alipayobjects.com/os/bmw-prod/b21e7336-0b3e-486c-9070-612ede49284e.json')
    //         .then((response) => response.json())
    //         .then((json) => setDatttta(json))
    //         .catch((error) => {
    //             console.log('fetch data failed', error);
    //         });
    // };

    // var configggg = {
    //     data: datttta,
    //     xField: 'date',
    //     yField: 'value',
    //     seriesField: 'country',
    // };

    const carstat = () => {
        axios
            .get('/api/cars/stat')
            .then(res => {
                for (const property in res.data.data) {
                    if (`${property}` === 'disponible') {
                        setDisponible(`${res.data.data[property]}`)
                    } else if (`${property}` === 'enpanne') {
                        setEnpanne(`${res.data.data[property]}`)
                    } else if (`${property}` === 'louee') {
                        setLouee(`${res.data.data[property]}`)
                    } else if (`${property}` === 'reservee') {
                        setReservee(`${res.data.data[property]}`)
                    }
                }
            })
    }

    const [margeData, setMargeData] = useState('')
    const difference = () => {
        setMargeData({
            labels: ['Ja', 'Fe', 'Ma', 'Av', 'Ma', 'Ju'],
            datasets: [
                {
                    label: 'Revenus',
                    data: [1000, 2000, 1400, 8200, 2000, 700],
                    fill: false,
                    backgroundColor: 'rgb(54, 162, 235)',
                    borderColor: 'rgba(54, 162, 235, 0.2)',
                    yAxisID: 'y-axis-2',
                },
                {
                    label: 'Dépenses',
                    data: [4000, 3000, 400, 10000, 1000, 1700],
                    fill: false,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgba(255, 99, 132, 0.2)',
                    yAxisID: 'y-axis-1',
                },
            ],
        })
    }

    const [locData, setLocData] = useState('')
    const loc = () => {
        setLocData({
            labels: ['Ja', 'Fe', 'Ma', 'Av', 'Ma', 'Ju'],
            datasets: [
                {
                    label: 'Locations',
                    data: [11, 20, 10, 14, 12, 3],
                    fill: false,
                    backgroundColor: 'rgb(54, 162, 235)',
                    borderColor: 'rgba(54, 162, 235, 0.2)',
                    yAxisID: 'y-axis-2',
                }
            ],
        })
    }

    const [rev, setRev] = useState(null)
    useEffect(() => {
        dispatch(listTeam());
        chart();
        carstat();
        montantnet();
        setRev(montant - allExpenses);
        difference();
        loc();
        barr();
    }, [dispatch, allExpenses, montant])

    return (
        <>
            {userInfo.isAdmin ?
                <Container style={{ paddingTop: '40px' }}>
                    <h5>Chiffre D'affaires</h5><hr></hr>
                    <Row style={{ paddingBottom: '50px', backgroundColor: '#FAFAFA' }}>
                        <Col className="card" style={{ height: '300px', borderRadius: '25px' }}>
                            <strong style={{ paddingTop: '15px' }}>Revenu/mois</strong>
                            <p>Le total des revenus est : {montant} </p>
                            <Bar data={barChart} options={options} />
                        </Col>
                        <Col className="card" style={{ height: "300px", borderRadius: '25px' }}>
                            <strong style={{ paddingTop: '15px' }}>Différence/mois</strong>
                            <p>La marge de gain est : {rev} </p>
                            <Line data={margeData} width={600} height={250} />
                        </Col>
                        <Col className="card" style={{ height: "415px", borderRadius: '25px' }}>
                            <strong style={{ paddingTop: '15px' }}>Dépenses/mois</strong>
                            <p>Le total des dépenses est : {allExpenses} </p>
                            <div style={{ height: "300px", borderRadius: '25px', paddingLeft: '5px' }}>
                                <Doughnut data={chartData} height={400} width={400} options={{ responsive: true }} />
                            </div>
                        </Col>
                        <Container>
                            <br></br>
                            <p>Ces chiffres sont mis à jour automatiquement en fonction des contrats signés avec les clients et des factures des dépenses de votre agence</p>
                        </Container>
                    </Row>
                    <Container style={{ paddingTop: '40px' }}>
                        <h5>Flotte</h5><hr></hr>
                        <Row >
                            <Col className='card' style={{ height: "400px", borderRadius: '25px', paddingLeft: '30px' }}>
                                <strong style={{ paddingTop: '20px' }}>Activité des voitures</strong>
                                <p>Le total des voitures possédés par l'agence est :</p>
                                <Container style={{ paddingTop: '20px' }}>
                                    <div className='row'>
                                        <div><img src={dispo} alt='voitures disponibles' style={{ width: '100px', paddingRight: '10px' }}></img></div>
                                        <div>{Disponible} Voitures disponibles</div>
                                        <div><img src={louee} alt='voitures louée' style={{ width: '100px', paddingRight: '10px' }}></img></div>
                                        <div>{Louee} Voitures louées</div>
                                    </div>
                                    <div className='row' style={{ paddingTop: '15px' }}>
                                        <div><img src={enpanne} alt='voitures en panne' style={{ width: '100px', paddingRight: '10px' }}></img></div>
                                        <div>{Enpanne} Voitures en panne</div>
                                        <div><img src={reservee} alt='voitures réservées' style={{ width: '100px', paddingRight: '10px' }}></img></div>
                                        <div>{Reservee} Voitures réservées</div>
                                    </div>
                                </Container>
                            </Col>
                            <Col className='card' style={{ borderRadius: '25px' }}>
                                <Container style={{ paddingTop: '20px' }}>
                                    <strong>Nombre de locations/mois</strong>
                                    <p>Le total des locations pendant ces mois est :</p>
                                    <div></div>
                                    <Line data={locData} width={450} height={200} />
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                    <Container style={{ paddingTop: '40px', paddingBottom: '40px' }}>
                        <h5>Effectif</h5><hr></hr>
                        <div className="float-container dashboard" style={{ backgroundColor: '#FAFAFA' }}>
                            <Row>
                                <Col style={{ paddingLeft: '30px' }}>
                                    <h6>Composition de l'équipe</h6>
                                    <div className='shadows' style={{
                                        width: '80%',
                                        float: 'left',
                                        padding: '30px',
                                        backgroundColor: '#FFFFFF'
                                    }}>
                                        <div >
                                            <img src={people} alt='people' style={{ width: '100px', paddingRight: '10px' }}></img>
                                            <strong>{numberofusers}</strong> Membre(s) dans l'équipe
                                        </div>
                                    </div>
                                </Col>
                                <Col>
                                    <div style={{
                                        width: '60%',
                                        float: 'left',
                                        padding: '20px'
                                    }}>
                                        <Button
                                            style={{
                                                padding: '20px',
                                                borderRadius: '25px',
                                                borderColor: '#EF8842',
                                                backgroundColor: '#EF8842'
                                            }}>
                                            <i class="fas fa-user-plus fa-5x my-2" ></i><br></br>
                                            Ajouter un membre dans l'équipe
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                    <div>
                        <Button className="center my-5"
                            style={{
                                padding: '20px',
                                margin: '150px',
                                borderRadius: '25px',
                                borderColor: '#E63C4A',
                                backgroundColor: '#E63C4A'
                            }}>
                            <img src={clock} alt='clock' style={{ width: '100px', paddingRight: '10px' }} ></img>
                            Alerte de renouvelement...
                            La fin de l'abonnement est dans :
                        </Button>
                    </div>
                </Container>
                : <div><center>
                    <h3 style={{ color: '#47799C' }}>Vous n'étes pas un admin pour consulter le Dashboard</h3>
                </center>
                </div>}
        </>
    )
}


export default DashboardScreen;