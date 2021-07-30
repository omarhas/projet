import React, { useEffect, useState } from 'react';
import './navbar.css'
import { useDispatch, useSelector } from 'react-redux'
import { Nav, NavDropdown, Container, Modal, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { createAgency, listAgency } from '../../actions/agencyAction.js'
import { logout } from '../../actions/userActions.js'
import avatar from '../../pic/avatar.png'
import trois from '../../pic/trois.png'
import six from '../../pic/six.png'
import un from '../../pic/un.png'
import douze from '../../pic/douze.png'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import '../popup.css'

const Navbar = ({ history }) => {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [ville, setVille] = useState('')
    const [cardnumber, setCardNumber] = useState('')
    const [security, setSecurity] = useState('')
    const [expdate, setExpdate] = useState('')

    const [wari, setWari] = useState(false);
    const handlesaker = () => setWari(false);
    const handleWari = () => setWari(true);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch()

    const agencyList = useSelector(state => state.agencyList)
    const { agency } = agencyList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const agencyAdd = useSelector(state => state.agencyAdd)
    const { loading, success, error } = agencyAdd

    const logoutHandler = () => {
        dispatch(logout())
    }
    const paymentHandler = () => {
        // Pay
    }
    const createAgencyHandler = (e) => {
        e.preventDefault()
        dispatch(createAgency(name, address, email, phone))
    }

    useEffect(() => {
        dispatch(createAgency())
        dispatch(listAgency())
    }, [dispatch])

    return (
        <Container>
            <nav className='navbar'>
                <Nav pullleft>
                    {userInfo ? (
                        agency.map((agency) => (
                            <div key={agency._id}>
                                {agency.name}
                            </div>
                        ))
                    ) : <div></div>}
                </Nav>
                <Nav pullRight>
                    {userInfo ? (
                        <><div className="navbar__right" >
                            <i className="fas fa-search" style={{ color: 'gray', margin: '10px' }}></i>
                            <i className="far fa-bell" style={{ color: 'gray', margin: '10px' }}></i>
                        </div>
                            <NavDropdown
                                title={
                                    <div className="pull-left">
                                        <img className="thumbnail-image"
                                            src={avatar}
                                            alt="avatar"
                                            style={{ display: 'block', margin: '10px', width: '20px' }}
                                        />
                                    </div>
                                }
                                id="basic-nav-dropdown">
                                <NavDropdown.Item className='dropdown'>
                                    <PersonOutlineIcon style={{ color: '#47799C', fontSize: '80px' }} /> {userInfo.nom}
                                    <div style={{ textAlign: 'center' }}>{(userInfo.isAdmin) ? <small>Profession: Admin</small> :
                                        <small>Profession: Employé(e)</small>}</div>
                                </NavDropdown.Item>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item><i className="fas fa-cog icons iconss padd"></i> Parametre du compte</NavDropdown.Item>
                                </LinkContainer>
                                <div onClick={handleWari}>
                                    <NavDropdown.Item><i className="fa fa-building-o icons iconss padd" aria-hidden="true"></i>
                                        Parametre de l'agence
                                    </NavDropdown.Item></div>
                                <Modal style={{ height: '600px', marginTop: '50px' }} show={wari} onHide={handlesaker}>
                                    <Modal.Header style={{ backgroundColor: '#FAF5E8' }} closeButton>
                                        <div>
                                            <i style={{ color: '#47799C', marginLeft: '200px' }} class="fas fa-building fa-7x"></i>
                                            <p style={{ color: '#47799C', marginLeft: '203px', marginTop: '10px', fontSize: '20px' }}>Agence</p>
                                            <strong>Veuillez ajouter les informations de votre agence.</strong>
                                        </div>
                                    </Modal.Header>
                                    <Modal.Body style={{ backgroundColor: '#FAF5E8' }}>
                                        <form>
                                            <div class="form-group">
                                                <input type="text" className="bordure form-control"
                                                    placeholder='Nom'
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}></input>
                                            </div>
                                            <div class="form-group">
                                                <input type="text" className="bordure form-control"
                                                    placeholder='Adresse'
                                                    value={address}
                                                    onChange={(e) => setAddress(e.target.value)}></input>
                                            </div>
                                            <div class="form-group">
                                                <input type="text" className="bordure form-control"
                                                    placeholder='Email'
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}></input>
                                            </div>
                                            <div class="form-group">
                                                <input type="text" className="bordure form-control"
                                                    placeholder='Numéro de téléphone'
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}></input>
                                            </div>
                                        </form>
                                        <button className='bouton' onClick={createAgencyHandler}>Sauvegarder les informations</button>
                                        <p>Après le sauvegarde, vous pouvez revenir à modifier les données de l'agence quand vous voulez</p>
                                    </Modal.Body>
                                </Modal><hr></hr>
                                <div onClick={handleShow}>
                                    <NavDropdown.Item><CalendarTodayIcon className='icons' /> Abonnement</NavDropdown.Item>
                                </div>
                                <Modal style={{ height: '600px', marginTop: '50px' }} show={show} onHide={handleClose}>
                                    <Modal.Header style={{ backgroundColor: '#FAF5E8' }} closeButton>
                                        <div>
                                            <CalendarTodayIcon style={{ fontSize: '50px' }} className='icons' /> Abonnement
                                        </div><br></br><hr></hr>
                                        <div>
                                            <Button style={{
                                                width: '300px',
                                                borderRadius: '25px',
                                                borderColor: '#E63C4A',
                                                backgroundColor: '#E63C4A',
                                            }}>
                                                <i class="fas fa-clock fa-3x"></i> |
                                                <div>Renouvelement dans:</div>
                                            </Button>
                                        </div>
                                    </Modal.Header>
                                    <Modal.Body style={{ backgroundColor: '#FAF5E8' }}>
                                        <div>
                                            <h6>Type d'abonnement</h6><hr></hr>
                                            <Row style={{ paddingBottom: '40px' }}>
                                                <Col><button style={{ border: 'none' }}>
                                                    <img style={{ width: '60px', height: '80px' }} src={un} alt='1 mois'></img>
                                                </button>
                                                    <br></br>
                                                    Un Mois
                                                    22DT
                                                </Col>
                                                <Col><button style={{ border: 'none' }}>
                                                    <img style={{ width: '60px', height: '80px' }} src={trois} alt='3 mois'></img>
                                                </button>
                                                    <br></br>
                                                    trois Mois
                                                    222DT
                                                </Col>
                                                <Col><button style={{ border: 'none' }}>
                                                    <img style={{ width: '60px', height: '80px' }} src={six} alt='6 mois'></img>
                                                </button>
                                                    <br></br>
                                                    Six Mois
                                                    2222DT
                                                </Col>
                                                <Col><button style={{ border: 'none' }}>
                                                    <img style={{ width: '60px', height: '80px' }} src={douze} alt='12 mois'></img>
                                                </button>
                                                    <br></br>
                                                    Un An
                                                    22222DT
                                                </Col>

                                            </Row>
                                        </div>
                                        <Row>
                                            <Col>
                                                <strong>Information sur la facturation</strong><hr></hr>
                                                <form>
                                                    <input type="text" className="bordure form-control"
                                                        placeholder='Nom et prénom'
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}></input>
                                                    <input type="text" className="bordure form-control"
                                                        placeholder='E-mail de facturation'
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}></input>
                                                    <input type="text" className="bordure form-control"
                                                        placeholder="Adresse de facturation"
                                                        value={address}
                                                        onChange={(e) => setAddress(e.target.value)}></input>
                                                    <input type="text" className="bordure form-control"
                                                        placeholder="Ville"
                                                        value={ville}
                                                        onChange={(e) => setVille(e.target.value)}></input>
                                                </form>
                                            </Col>
                                            <Col>
                                                <strong>Type de paiement</strong><hr></hr>
                                                <form >
                                                    <label for="male">Carte bancaire</label>
                                                    <input type="radio" id="male" name="gender" value="male" />
                                                    <br />
                                                    <label for="female">Visa</label>
                                                    <input type="radio" id="female" name="gender" value="female" />
                                                    <br />
                                                    <label for="other">Master Card</label>
                                                    <input type="radio" id="other" name="gender" value="other" />
                                                    <input type="text" className="bordure form-control"
                                                        placeholder='Numero de carte'
                                                        value={cardnumber}
                                                        onChange={(e) => setCardNumber(e.target.value)}></input>
                                                    <input type="text" className="bordure form-control"
                                                        placeholder='Code de sécurité'
                                                        value={security}
                                                        onChange={(e) => setSecurity(e.target.value)}></input>
                                                    <input type="text" className="bordure form-control"
                                                        placeholder="Date d'expiration de la carte"
                                                        value={expdate}
                                                        onChange={(e) => setExpdate(e.target.value)}></input>
                                                </form>
                                                <div className='pt-3'>
                                                    <button className='paybtn' onClick={paymentHandler}>Enregistrer le contrat</button>
                                                </div>
                                                <p>Attention, vous ne pouvez pas retounrer en arriére après cette action</p>
                                            </Col>
                                        </Row>
                                    </Modal.Body>
                                </Modal>
                                <hr></hr>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    <i className="fas fa-sign-out-alt icons iconss"></i> Déconnexion</NavDropdown.Item>
                            </NavDropdown></>) : <LinkContainer to='/login' >
                        <Nav.Link><button > Connexion </button></Nav.Link>
                    </LinkContainer>}
                </Nav>
            </nav>
        </Container>
    )
}

export default Navbar