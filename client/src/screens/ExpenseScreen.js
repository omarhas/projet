import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button, Table, Modal } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { supprimer, listExpenses, ajouter, update } from '../actions/expenseActions.js';
import Loader from '../components/Loader.js';
import Message from '../components/Message.js';
import './popup.css'

const ExpenseScreen = ({ history }) => {
    const [type, setType] = useState('')
    const [montant, setMontant] = useState('')
    const [matricule, setMatricule] = useState('')
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [disp, setDisp] = useState(false);
    const modalClose = () => setDisp(false);
    const modalShow = () => setDisp(true);

    const [leasing, setLeasing] = useState('leasing')
    const [bureau, setBureau] = useState('bureau')
    const [salaires, setSalaires] = useState('salaires')
    const [maintenance, setMaintenance] = useState('maintenance')
    const [autres, setAutres] = useState('autres')

    const dispatch = useDispatch()

    const expensesList = useSelector(state => state.expensesList)
    const { loading, error, expenses } = expensesList

    const expenseDelete = useSelector(state => state.expenseDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = expenseDelete

    const expenseCreate = useSelector(state => state.expenseCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, expenses: expensesCreate } = expenseCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const updateExpense = useSelector(state => state.updateExpense)
    const { loading: updateLoading, error: updateError, success: updateSuccess } = updateExpense

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
        if (successCreate) {
            history.push(`/expenses`)
        } else {
            dispatch(listExpenses())
        }
    }, [dispatch, userInfo, history, successDelete, successCreate, expensesCreate])

    const deleteHandler = (id) => {
        if (window.confirm('vous étes sure')) {
            dispatch(supprimer(id))
        }
    }
    const createExpenseHandler = (e) => {
        e.preventDefault()
        dispatch(ajouter(type, montant))
    }

    const updateExpenseHandler = (id) => {
        dispatch(update({
            id: expenses._id,
            type,
            montant
        }))
    }

    return (
        <>
            {userInfo.isAdmin ?
                <Container>
                    <Container>
                        <Row>
                            <Col className='text-right'>
                                <Button className="my-3" style={{ backgroundColor: '#EF8842', borderColor: '#EF8842' }} onClick={handleShow}>
                                    <i className='fas fa-plus'></i> Ajouter une dépense
                                </Button>
                                <Modal style={{ height: '500px', marginTop: '50px' }} show={show} onHide={handleClose}>
                                    <Modal.Header style={{ backgroundColor: '#FAF5E8' }} closeButton>
                                        <div>
                                            <i style={{ color: '#47799C', marginLeft: '210px' }} class="fas fa-dollar-sign fa-7x"></i>
                                            <p style={{ color: '#47799C', marginLeft: '160px', marginTop: '10px', fontSize: '20px' }}>Nouveau dépense</p>
                                            <strong>Veuillez ajouter les informations de vos dépenses.</strong>
                                        </div>
                                    </Modal.Header>
                                    <Modal.Body style={{ backgroundColor: '#FAF5E8' }}>
                                        <form>
                                            <div className='row'>
                                                <div class="form-group col-sm-8">
                                                    <select className='select1 type' onChange={(e) => setType(e.target.value)}>
                                                        <option value="">Type de dépense</option>
                                                        <option value={leasing} onChange={(e) => setLeasing(e.target.value)}>Leasing</option>
                                                        <option value={salaires} onChange={setSalaires}>Salaires</option>
                                                        <option value={bureau} onChange={(e) => setBureau(e.target.value)}>Bureau</option>
                                                        <option value={maintenance} onChange={(e) => setMaintenance(e.target.value)}>Maintenance</option>
                                                        <option value={autres} onChange={(e) => setAutres(e.target.value)}>autres</option>
                                                    </select>
                                                </div>
                                                <div class="form-group col-sm-4">
                                                    <input type="text" className="bordure form-control"
                                                        placeholder='Matricule'
                                                        value={matricule}
                                                        onChange={(e) => setMatricule(e.target.value)}></input>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <input type="text" className="bordure form-control"
                                                    placeholder='Montant'
                                                    value={montant}
                                                    onChange={(e) => setMontant(e.target.value)}></input>
                                            </div>
                                            <div class="form-group">
                                                <input type="text" className="bordure form-control"
                                                    placeholder='Référence'></input>
                                            </div>
                                        </form>

                                        <button className='bouton' onClick={createExpenseHandler}>Enregistrer la facture</button>
                                    </Modal.Body>
                                </Modal>
                            </Col>
                        </Row>
                    </Container>
                    <Container>
                        <Col>
                            <h5>Tableau des suivis des dépenses</h5>
                        </Col>
                    </Container>
                    {updateLoading && <Loader />}
                    {updateError && <Message variant='danger'>{updateError}</Message>}
                    {loadingDelete && <Loader />}
                    {errorDelete && <Message variant='danger' >{errorDelete}</Message>}
                    {loadingCreate && <Loader />}
                    {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
                    {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                        <Table bordered responsive hover>
                            <thead style={{ textAlign: 'center' }}>
                                <tr>
                                    <th>ID</th>
                                    <th>Type</th>
                                    <th>Date</th>
                                    <th>Montant</th>
                                    <th>Mod/Supp</th>
                                </tr>
                            </thead>
                            <tbody style={{ textAlign: 'center' }}>
                                {expenses.map((expenses) => (
                                    <tr key={expenses._id}>
                                        <td>{expenses._id.length > 1 ? expenses._id[2] : expenses._id} </td>
                                        <td style={{ color: '#EF8842' }}>{expenses.type}</td>
                                        <td style={{ color: '#263A5B' }}>{expenses.createdAt.substring(0, 10)}</td>
                                        <td style={{ color: '#EF8842' }}>{expenses.montant}</td>
                                        <td>
                                            <LinkContainer to={`/expenses/${expenses._id}`} >
                                                <Button variant='btn-default' className='btn-sm' onClick={modalShow}>
                                                    <i className='fas fa-edit' style={{ color: '#F9B858' }}></i>
                                                </Button>
                                            </LinkContainer>|
                                            <Modal style={{ height: '500px', marginTop: '50px' }} show={disp} onHide={modalClose}>
                                                <Modal.Header style={{ backgroundColor: '#FAF5E8' }} closeButton>
                                                    <div>
                                                        <i className="fas fa-car-side fa-5x icon"></i>
                                                        <p>Veuillez corriger les informations de vos dépenses.</p>
                                                    </div>
                                                </Modal.Header>
                                                <Modal.Body style={{ backgroundColor: '#FAF5E8' }}>
                                                    <form>
                                                        <div className='row'>
                                                            <div class="form-group col-sm-8" >
                                                                <select className='select1 type' onChange={(e) => setType(e.target.value)}>
                                                                    <option value="">Type de dépense</option>
                                                                    <option value={leasing} onChange={(e) => setLeasing(e.target.value)}>Leasing</option>
                                                                    <option value={salaires} onChange={setSalaires}>Salaires</option>
                                                                    <option value={bureau} onChange={(e) => setBureau(e.target.value)}>Bureau</option>
                                                                    <option value={maintenance} onChange={(e) => setMaintenance(e.target.value)}>Maintenance</option>
                                                                    <option value={autres} onChange={(e) => setAutres(e.target.value)}>autres</option>
                                                                </select>
                                                            </div>
                                                            <div class="form-group col-sm-4">
                                                                <input type="text" className="bordure form-control"
                                                                    placeholder='Matricule'
                                                                    value={matricule}
                                                                    onChange={(e) => setMatricule(e.target.value)}></input>
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <input type="text" className="bordure form-control"
                                                                placeholder='Montant'
                                                                value={montant}
                                                                onChange={(e) => setMontant(e.target.value)}></input>
                                                        </div>
                                                        <div class="form-group">
                                                            <input type="text" className="bordure form-control"
                                                                placeholder='Référence'></input>
                                                        </div>
                                                    </form>

                                                    <button className='bouton' onClick={updateExpenseHandler}>Modifier la facture</button>
                                                </Modal.Body>
                                            </Modal>
                                            <Button
                                                variant='btn-default'
                                                className='btn-sm'
                                                onClick={() => deleteHandler(expenses._id)}>
                                                <i className='fas fa-trash-alt' style={{ color: 'red' }} ></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    }
                </Container > : <div><center>
                    <h3 style={{ color: '#47799C' }}>Vous n'étes pas un admin pour consulter les Dépenses</h3>
                </center>
                </div>}
        </>
    )
}

export default ExpenseScreen