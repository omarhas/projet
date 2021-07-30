import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Container, Table, Modal } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { listTeam } from '../actions/teamActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { register, suppr } from '../actions/userActions.js'
import './TeamScreen.css'

import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

const TeamScreen = ({ history }) => {
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [adresse, setAdresse] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [salaire, setSalaire] = useState('')
    const [motdepasse, setMotdepasse] = useState('')
    const [confirmMotdepasse, setConfirmMotdepasse] = useState('')
    const [message, setMessage] = useState(null)

    const [admin, setAdmin] = useState('')
    const [employee, setEmployee] = useState('')

    const [het, setHet] = useState(false);
    const handlezayen = () => setHet(false);
    const handleHet = () => setHet(true);

    const dispatch = useDispatch()

    const teamList = useSelector(state => state.teamList)
    const { loading, error, users, numberofusers } = teamList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userRegister = useSelector(state => state.userRegister)
    const { loading: loadingCreate, error: errorCreate, success: succReg } = userRegister

    const deleteUser = useSelector(state => state.deleteUser)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = deleteUser

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            dispatch(listTeam())
        }
    }, [dispatch, userInfo, history, successDelete, succReg])

    const addUserHandler = (e) => {
        e.preventDefault()
        if (motdepasse !== confirmMotdepasse) {
            setMessage("Mot de passe incorrecte")
        } else {
            dispatch(register(nom, prenom, adresse, phone, email, motdepasse, salaire, admin, employee))
            if (succReg) {
                store.addNotification({
                    title: 'Membre',
                    message: 'Membre ajouté avec succée',
                    type: 'warning',
                    container: 'top-right',
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    width: 300,
                    dismiss: {
                        duration: 4000
                    }
                })
            }
        }
    }
    const deleteHandler = (id) => {
        if (window.confirm('Vous-étes sure ?')) {
            dispatch(suppr(id))
        }
    }
    return (
        <Container>
            <Container >
                <Row>
                    <Col>
                        <h6>Ajouter effectif</h6>
                    </Col>
                </Row>
            </Container >
            <div>
                <Row>
                    <Col className='text-center'>
                        <Button className="my-5"
                            style={{
                                padding: '20px',
                                borderRadius: '25px',
                                borderColor: '#EF8842',
                                backgroundColor: '#EF8842'
                            }} onClick={handleHet}>
                            <i class="fas fa-user-plus fa-5x my-2" ></i><br></br>
            Ajouter un membre dans l'équipe
                    </Button>
                        <Modal show={het} onHide={handlezayen}>
                            <Modal.Header style={{ backgroundColor: '#FAF5E8' }} closeButton>
                                <div>
                                    <i style={{ color: '#47799C', marginLeft: '200px' }} class="fas fa-user-plus fa-5x my-2" ></i>
                                    <p style={{ color: '#47799C', marginLeft: '160px', marginTop: '10px', fontSize: '20px' }}>Nouveau Membre</p>
                                    <strong>Veuillez ajouter les informations du contrat à ajouter.</strong>
                                </div>
                            </Modal.Header>
                            <Modal.Body style={{ backgroundColor: '#FAF5E8' }}>
                                <form>
                                    <Row>
                                        <Col>
                                            <div class="form-group">
                                                <input type="text" className="bordure form-control"
                                                    id="nom"
                                                    placeholder='Nom'
                                                    value={nom}
                                                    onChange={(e) => setNom(e.target.value)}></input>
                                            </div></Col>
                                        <Col>
                                            <div class="form-group">
                                                <input type="text" className="bordure form-control"
                                                    id="prenom"
                                                    placeholder='prénom'
                                                    value={prenom}
                                                    onChange={(e) => setPrenom(e.target.value)}></input>
                                            </div></Col>
                                    </Row>
                                    <div class="form-group">
                                        <input type="text" className="bordure form-control"
                                            id="email"
                                            placeholder='Email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}></input>
                                    </div>
                                    <Row>
                                        <Col>
                                            <div class="form-group">
                                                <input type="password" className="bordure form-control"
                                                    placeholder='Mot de passe'
                                                    value={motdepasse}
                                                    onChange={(e) => setMotdepasse(e.target.value)}></input>
                                            </div>
                                        </Col>
                                        <Col>
                                            <div class="form-group">
                                                <input type="password" className="bordure form-control"
                                                    placeholder='Confirmer le mot de passe'
                                                    value={confirmMotdepasse}
                                                    onChange={(e) => setConfirmMotdepasse(e.target.value)}></input>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div class="form-group">
                                        <input type="text" className="bordure form-control"
                                            id="salaire"
                                            placeholder='Salaire'
                                            value={salaire}
                                            onChange={(e) => setSalaire(e.target.value)}></input>
                                    </div>
                                    <div style={{ textAlign: 'right', fontSize: '20px' }}>
                                        <input
                                            type='checkbox'
                                            value='personal'
                                            onChange={(e) => setEmployee(e.target.value)}
                                        />{' '}Employé{' '}
                                        <input
                                            type='checkbox'
                                            value='professional'
                                            onChange={(e) => setAdmin(e.target.value)}
                                        />{' '}Admin
                                    </div>
                                </form>
                                <button className='bouton' style={{ alignContent: 'center' }} onClick={addUserHandler}>
                                    Enregister un membre
                    </button>
                            </Modal.Body>
                        </Modal>
                        <ReactNotification />
                    </Col>
                </Row>
            </div>
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                <Table bordered responsive hover >
                    <thead style={{ textAlign: 'center' }}>
                        <tr>
                            <th>Id</th>
                            <th>Membre</th>
                            <th>Email</th>
                            <th>Adresse</th>
                            <th>Num.Tél</th>
                            <th>Salaire</th>
                            <th>Mod/Supp</th>
                        </tr>
                    </thead>
                    <tbody style={{ textAlign: 'center' }}>
                        {users.map((users) => (
                            <tr key={users._id}>
                                <td>{users._id.length > 1 ? users._id[2] : users._id} </td>
                                <td>{users.nom}<br></br>{users.prenom}</td>
                                <td>{users.email}</td>
                                <td>{users.adresse}</td>
                                <td>{users.phone}</td>
                                <td>{users.salaire}</td>
                                <td>
                                    <LinkContainer to={`/users/${users._id}`} >
                                        <Button variant='btn-default' className='btn-sm'>
                                            <i className='fas fa-edit' style={{ color: '#F9B858' }}></i>
                                        </Button>
                                    </LinkContainer>|
                                    <Button
                                        variant='btn-default'
                                        className='btn-sm'
                                        onClick={() => deleteHandler(users._id)}>
                                        <i className='fas fa-trash-alt' style={{ color: 'red' }} ></i>
                                    </Button></td>
                            </tr>))}
                    </tbody>
                </Table>}
        </Container>
    )
}

export default TeamScreen
