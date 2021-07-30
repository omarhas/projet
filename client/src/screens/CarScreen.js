import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Table, Container, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import BootstrapTable from "react-bootstrap-table-next";
import { LinkContainer } from 'react-router-bootstrap';
import { deleteCar, listCars, addCar, howMany } from '../actions/carActions.js';
import Loader from '../components/Loader.js';
import Message from '../components/Message.js';
import './popup.css'
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import ReactNotification from 'react-notifications-component'
import car from '../pic/car.png'

const CarScreen = ({ history }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [glow, setGlow] = useState(false);
    const RowClose = () => setGlow(false);
    const handleglow = () => setGlow(true);

    const [disp, setDisp] = useState(false);
    const modalClose = () => setDisp(false);
    const modalShow = () => setDisp(true);

    const [status, setStatus] = useState("");
    const [matricule, setMatricule] = useState('')
    const [modele, setModele] = useState('')
    const [chassis, setChassis] = useState('')
    const [action, setAction] = useState([])

    const dispatch = useDispatch()

    const carList = useSelector(state => state.carList)
    const { loading, error, cars } = carList

    const carDelete = useSelector(state => state.carDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = carDelete

    const carAdd = useSelector(state => state.carAdd)
    const { loading: loadingCreate, error: errorCreate, success: successCreate } = carAdd

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } if (successCreate) {
            history.push(`/cars`)
        } else {
            dispatch(listCars())
            dispatch(howMany())
        }
    }, [dispatch, userInfo, history, successDelete, successCreate])

    const deleteHandler = (id) => {
        if (window.confirm('vous étes sure')) {
            dispatch(deleteCar(id))
        }
    }
    const createCarHandler = (e) => {
        e.preventDefault()
        dispatch(addCar(modele, matricule, chassis, status))
    }

    const updateCarHandler = (e) => {
        // Dispatch 
    }


    return (
        <Container>
            <Row>
                <Col className='text-right'>
                    {loadingCreate && <Loader />}
                    {errorCreate && <Message variant='danger' > {errorCreate} </Message>}
                    <Button style={{ backgroundColor: '#EF8842', borderColor: '#EF8842' }} onClick={handleShow}>
                        <i className='fas fa-plus'></i> Ajouter une voiture
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header style={{ backgroundColor: '#FAF5E8' }} closeButton>
                            <div>
                                <i style={{ color: '#47799C', marginLeft: '180px' }} className="fas fa-car-side fa-7x icon"></i>
                                <p style={{ color: '#47799C', marginLeft: '160px', marginTop: '10px', fontSize: '20px' }}>Nouveau voiture</p>
                                <strong>Veuillez ajouter les informations du véhicule à ajouter.</strong>
                            </div>
                        </Modal.Header>
                        <Modal.Body style={{ backgroundColor: '#FAF5E8' }}>
                            <form>
                                <div class="form-group">
                                    <input type="text" className="bordure form-control"
                                        id="modele"
                                        placeholder="Modele"
                                        value={modele}
                                        onChange={(e) => setModele(e.target.value)}></input>
                                </div>
                                <div class="form-group">
                                    <input type="text" className="bordure form-control"
                                        id="matricule"
                                        placeholder="Matricule"
                                        value={matricule}
                                        onChange={(e) => setMatricule(e.target.value)}></input>
                                </div>
                                <div class="form-group" >
                                    <input type="text" className="bordure form-control"
                                        id="chassis"
                                        placeholder='chassis'
                                        value={chassis}
                                        onChange={(e) => setChassis(e.target.value)}></input>
                                </div>
                                <div className='alignright'>
                                    <strong >Statut de la voiture: </strong>
                                    <select className='select1' value={status} onChange={(e) => setStatus(e.target.value)} >
                                        <option id='status' value="en panne">En panne</option>
                                        <option id='status' value="disponible">Disponible</option>
                                        <option id='status' value="louée">Louer</option>
                                        <option id='status' value="reservée">Reserver</option>
                                    </select>
                                </div>
                            </form>
                            <ReactNotification />
                            <button className='bouton' onClick={createCarHandler}>
                                Ajouter la voiture
                            </button>
                        </Modal.Body>
                    </Modal>
                </Col>
            </Row>
            <Container>
                <Row>
                    <h6 className='my-3'>Tableau du suivi des voitures</h6>
                </Row>
            </Container>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                <Table className='table' bordered hover responsive >
                    <thead style={{ textAlign: 'center' }}>
                        <tr>
                            <th>Id</th>
                            <th>Modele</th>
                            <th>Matricule</th>
                            <th>Status</th>
                            <th>Chassis</th>
                            <th>Action</th>
                            <th>Mod/Supp</th>
                        </tr>
                    </thead>
                    <tbody style={{ textAlign: 'center' }}>
                        {cars.map((cars) => (
                            <tr key={cars._id} >
                                <td>{cars._id.length > 1 ? cars._id[2] : cars._id} </td>
                                <td onClick={handleglow}><Modal show={glow} onHide={RowClose}>
                                    <Modal.Header closeButton>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Container>
                                            <div>
                                                <Row>
                                                    <Col>
                                                        <img src={car} alt='voitures' style={{ width: '80px' }}></img>
                                                    </Col>
                                                    <Col>
                                                        <Row>
                                                            <strong>Modéle: </strong> {cars.modele}
                                                        </Row>
                                                        <Row>
                                                            <strong>Matricule:  </strong> {cars.matricule}
                                                        </Row>
                                                        <Row>
                                                            <strong>Durée de location: </strong> {cars.status}
                                                        </Row>
                                                        <Row>
                                                            <strong>Kilométrage: </strong>
                                                        </Row>
                                                    </Col>
                                                    <Col>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <Row style={{ margin: '20px' }}>
                                                <Col>
                                                    <strong>DEPENSES</strong>
                                                    <Row>
                                                        Maintenance:
                                                    </Row>
                                                    <Row>
                                                        Réparation:
                                                    </Row>
                                                    <Row>
                                                        Leasing:
                                                    </Row>
                                                    Total:
                                                </Col>
                                                <Col>
                                                    <strong>REVENUS</strong>
                                                    <Row>
                                                        Nombre de locations:
                                                    </Row>
                                                    Total:
                                                </Col>
                                            </Row>
                                            <center style={{ border: '1px solid red', padding: '5px', width: '100px', marginLeft: '150px' }}>Total: </center>
                                        </Container>
                                    </Modal.Body>
                                </Modal>{cars.modele}</td>
                                <td>{cars.matricule}</td>
                                <td>{cars.status}</td>
                                <td>{cars.chassis}</td>
                                <td>
                                    <select className='select1' value={action} onChange={(e) => setAction(e.target.value)}>
                                        <option value="en panne">En panne</option>
                                        <option value="disponible">Disponible</option>
                                        <option value="Louer" onClick={modalShow}>Louer</option>
                                        <Modal style={{ height: '500px', marginTop: '50px' }} show={disp} onHide={modalClose}>
                                            <Modal.Header style={{ backgroundColor: '#FAF5E8' }} closeButton>
                                                <div>
                                                    <i className="fas fa-car-side fa-5x icon"></i>
                                                    <p>Veuillez ajouter les informations du véhicule à ajouter.</p>
                                                </div>
                                            </Modal.Header>
                                        </Modal>
                                        <option value="Reserver">Reserver</option>
                                    </select>
                                </td>
                                <td>
                                    <LinkContainer to={`/cars/${cars._id}`} >
                                        <Button variant='btn-default' className='btn-sm' onClick={modalShow}>
                                            <i class="fas fa-edit" style={{ color: '#EF8842' }}></i>
                                        </Button>
                                    </LinkContainer>
                                    <Modal style={{ height: '500px', marginTop: '50px' }} show={disp} onHide={modalClose}>
                                        <Modal.Header style={{ backgroundColor: '#FAF5E8' }} closeButton>
                                            <div>
                                                <i className="fas fa-car-side fa-5x icon"></i>
                                                <p>Veuillez ajouter les informations du véhicule à ajouter.</p>
                                            </div>
                                        </Modal.Header>
                                        <Modal.Body style={{ backgroundColor: '#FAF5E8' }}>
                                            <form>
                                                <div class="form-group">
                                                    <input type="text" className="bordure form-control"
                                                        id="modele"
                                                        placeholder="Modele"
                                                        value={modele}
                                                        onChange={(e) => setModele(e.target.value)}></input>
                                                </div>
                                                <div class="form-group">
                                                    <input type="text" className="bordure form-control"
                                                        id="matricule"
                                                        placeholder="Matricule"
                                                        value={matricule}
                                                        onChange={(e) => setMatricule(e.target.value)}></input>
                                                </div>
                                                <div class="form-group" >
                                                    <input type="text" className="bordure form-control"
                                                        id="chassis"
                                                        placeholder='chassis'
                                                        value={chassis}
                                                        onChange={(e) => setChassis(e.target.value)}></input>
                                                </div>
                                                <div className='alignright'>
                                                    <strong >Statut de la voiture: </strong>
                                                    <select className='select1' id="status" value={status}
                                                        onChange={(e) => setStatus(e.target.value)}>
                                                        <option id='status' value="en panne">En panne</option>
                                                        <option id='status' value="disponible">Disponible</option>
                                                        <option id='status' value="louée">Louer</option>
                                                        <option id='status' value="reservée">Reserver</option>
                                                    </select>
                                                </div>
                                            </form>
                                            <button className='bouton' onClick={updateCarHandler}>
                                                Modifier la voiture
                                            </button>
                                        </Modal.Body>
                                    </Modal>
                                    |
                                    <Button
                                        variant='btn-default'
                                        className='btn-sm'
                                        onClick={() => deleteHandler(cars._id)}>
                                        <i className='fas fa-trash-alt' style={{ color: 'red' }} ></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            }
        </Container>
    )
}

export default CarScreen