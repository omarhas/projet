import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Container, Button, Table, Form, Row, Col, Modal } from 'react-bootstrap';
import { listContract, supprimerContrat } from '../actions/contractAction.js';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../components/Loader.js';
import Message from '../components/Message.js';
import '../index.css'
import { creer } from '../actions/contractAction.js'
import './popup.css'
import jsPDF from 'jspdf'

const ContractScreen = ({ history }) => {
  const [fdname, setFdname] = useState('')
  const [fdpermis, setFdpermis] = useState('')
  const [fdidentifier, setFdidentifier] = useState('')
  const [fdemission, setFdemission] = useState('')

  const [sdname, setSdname] = useState('')
  const [sdpermis, setSdpermis] = useState('')
  const [sdidentifier, setSdidentifier] = useState('')
  const [sdemission, setSdemission] = useState('')

  const [modele, setModele] = useState('')
  const [chassis, setChassis] = useState('')
  const [matricule, setMatricule] = useState('')

  const [price, setPrice] = useState('')
  const [priceperday, setPriceperday] = useState('')
  const [datedebut, setDatedebut] = useState('')
  const [datefin, setDatefin] = useState('')
  const [bond, setBond] = useState('')
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [disp, setDisp] = useState(false);
  const modalClose = () => setDisp(false);
  const modalShow = () => setDisp(true);

  const jsPdfGenerator = () => {
    var doc = new jsPDF('p', 'pt');
    doc.save('Contrat.pdf');
  }

  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const contractList = useSelector(state => state.contractList)
  const { loading, error, contracts } = contractList
  const addContract = useSelector(state => state.addContract)
  const { loading: loadingcreer, error: errorcreer, contract: contractcreer } = addContract
  console.log('object', contracts)
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    if (contractcreer) {
      history.push(`/contrat`)
    } else {
      dispatch(listContract())
    }
  }, [dispatch, history, userInfo, contractcreer])

  const deleteHandler = (id) => {
    if (window.confirm('Vous étes sure de supprimer ce contrat ?')) {
      dispatch(supprimerContrat(id))
    }
  }
  const createContractHandler = () => {
    dispatch(creer(fdname, fdpermis, fdidentifier, fdemission, sdname, sdpermis, sdidentifier, sdemission, modele, chassis, matricule, price, priceperday, bond, datedebut, datefin))
  }

  const updateContractHandler = () => {
    // UPDATE
  }
  return (
    <Container >
      <Container >
        <Row>
          <Col>
            <h6>Actions</h6>
          </Col>
        </Row>
      </Container >
      {loadingcreer ? <Loader /> : errorcreer ? <Message variant='danger'>{errorcreer}</Message> :
        <Row>
          <Col className='text-center'>
            <Button className="my-5"
              style={{
                padding: '20px',
                borderRadius: '25px',
                borderColor: '#EF8842',
                backgroundColor: '#EF8842'
              }} onClick={handleShow}>
              <i class="fas fa-file-alt fa-5x my-2" ></i><br></br>
              Créer un contrat de location
            </Button>
            <div style={{ width: '700px' }}>
              <Modal size="lg" style={{ height: '600px', marginTop: '50px' }} show={show} onHide={handleClose}>
                <Modal.Header style={{ backgroundColor: '#FAF5E8' }} closeButton>
                  <div >
                    <i style={{ color: '#47799C', marginLeft: '340px' }} class="fas fa-clipboard fa-9x"></i>
                    <p style={{ color: '#47799C', marginLeft: '300px', marginTop: '20px', fontSize: '20px' }}>Contrat De location</p>
                    <strong>Veuillez ajouter les informations de l'accord de location, Merci!</strong>
                  </div>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#FAF5E8' }}>
                  <Row>
                    <Col><strong>
                      Premier Conducteur
                    </strong><hr></hr>
                      <form>
                        <div class="form-group">
                          <input type="text" className="bordure form-control"
                            placeholder='Premier Conducteur'
                            value={fdname}
                            onChange={(e) => setFdname(e.target.value)}></input>
                        </div>
                        <div class="form-group">
                          <input type="text" className="bordure form-control"
                            placeholder='Numéro de permis'
                            value={fdpermis}
                            onChange={(e) => setFdpermis(e.target.value)}></input>
                        </div>
                        <Row><Col><div class="form-group">
                          <input type="text" className="bordure form-control"
                            placeholder='CIN/Passeport'
                            value={fdidentifier}
                            onChange={(e) => setFdidentifier(e.target.value)}></input>
                        </div>
                        </Col>
                          <Col>
                            <div class="form-group">
                              <input type="text" className="bordure form-control"
                                placeholder="Date d'émission"
                                value={fdemission}
                                onChange={(e) => setFdemission(e.target.value)}></input>
                            </div>
                          </Col>
                        </Row>
                      </form>
                    </Col>
                    <Col>
                      <strong>
                        Deuxiéme Conducteur
                      </strong>
                      <hr></hr>
                      <form>
                        <div class="form-group">
                          <input type="text" className="bordure form-control"
                            placeholder='Deuxiéme conducteur'
                            value={sdname}
                            onChange={(e) => setSdname(e.target.value)}></input>
                        </div>
                        <div class="form-group">
                          <input type="text" className="bordure form-control"
                            placeholder='Numéro de permis'
                            value={sdpermis}
                            onChange={(e) => setSdpermis(e.target.value)}></input>
                        </div>
                        <Row><Col>
                          <div class="form-group">
                            <input type="text" className="bordure form-control"
                              placeholder='CIN/Passeport'
                              value={sdidentifier}
                              onChange={(e) => setSdidentifier(e.target.value)}></input>
                          </div>
                        </Col>
                          <Col>
                            <div class="form-group">
                              <input type="text" className="bordure form-control"
                                placeholder="Date d'émission"
                                value={sdemission}
                                onChange={(e) => setSdemission(e.target.value)}></input>
                            </div>
                          </Col></Row>
                      </form>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <strong>
                        Voiture
                      </strong>
                      <hr></hr>
                      <form>
                        <div class="form-group">
                          <input type="text" className="bordure form-control"
                            placeholder="Modele"
                            value={modele}
                            onChange={(e) => setModele(e.target.value)}></input>
                        </div>
                        <div class="form-group">
                          <input type="text" className="bordure form-control"
                            placeholder="Chassis"
                            value={chassis}
                            onChange={(e) => setChassis(e.target.value)}></input>
                        </div>
                        <div class="form-group">
                          <input type="text" className="bordure form-control"
                            placeholder="Matricule"
                            value={matricule}
                            onChange={(e) => setMatricule(e.target.value)}></input>
                        </div>
                      </form>
                    </Col>
                    <Col>
                      <strong>
                        Données de location
                      </strong>
                      <hr></hr>
                      <form>
                        <div class="form-group">
                          <input type="text" className="bordure form-control"
                            placeholder="Prix de location par jour"
                            value={priceperday}
                            onChange={(e) => setPriceperday(e.target.value)}></input>
                        </div>
                        <div class="form-group">
                          <input type="text" className="bordure form-control"
                            placeholder="Montant de location"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}></input>
                        </div>
                      </form>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <strong>
                        Période de location
                      </strong>
                      <hr></hr>
                      Du <input type='date' className="bordure form-control"
                        onChange={(e) => setDatedebut(e.target.value)}></input>
                      Au <input type='date' className="bordure form-control"
                        onChange={(e) => setDatefin(e.target.value)}></input>
                    </Col>
                    <Col>
                      <strong>
                        Cautionnement
                      </strong>
                      <hr></hr>
                      <strong className='pr-5'>Cautionnement</strong>
                      <label for="female">Oui</label>
                      <input type="radio" id="female" name="gender" value="female" />
                      <label for="female">Non</label>
                      <input type="radio" id="female" name="gender" value="female" />
                      <div class="form-group">
                        <input type="text" className="bordure form-control"
                          placeholder="Montant de cautionnement"
                          value={bond}
                          onChange={(e) => setBond(e.target.value)}></input>
                      </div>
                      <strong className='pr-3'>Paiement</strong>
                      <label for="cheque">Par chéque</label>
                      <input type="radio" id="paiement" name="paiement" value="paiement" />
                      <label for="espece">En espéce</label>
                      <input type="radio" id="paiement" name="paiement" value="paiement" />
                      <div className='pt-4 pb-2'>
                        <button className='paybtn bordure' onClick={createContractHandler}>
                          Enregistrer le contrat et voir
                        </button>
                      </div>
                      <div className='pt-2 pb-2'>
                        <button className='paybtn bordure'>
                          Enregistrer le contrat et imprimer
                        </button>
                      </div>
                      Aprés l'enregistrement, le contrat va être ajouté dans la section contrats
                    </Col>
                  </Row>
                </Modal.Body>
              </Modal>
            </div>
          </Col>
        </Row>
      }
      <Container >
        <Row>
          <Col>
            <h6 className='my-3'>Tableau des contrats</h6>
          </Col>
        </Row>
      </Container >
      {contracts.length === 0 && <Message>Pas de contrats</Message>}
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
        <Table bordered responsive hover >
          <thead style={{ textAlign: 'center' }}>
            <tr>
              <th>Id</th>
              <th>Informations</th>
              <th>Période</th>
              <th>Identité voiture</th>
              <th>Client</th>
              <th>Montant</th>
              <th>Mod/Imp/Supp</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: 'center' }}>
            {contracts.map((contracts) => (
              <tr key={contracts._id}>
                <td>{contracts._id.length > 1 ? contracts._id[2] : contracts._id} </td>
                <td>{contracts.createdAt.substring(0, 10)}</td>
                <td>De {contracts.datedebut} à {contracts.datefin}</td>
                <td>
                  {contracts.voiture.map((voiture) => (
                    <div key={voiture._id}>{voiture.modele}</div>
                  ))}
                </td>
                <td>{contracts.firstdriver.map((firstdriver) => (
                  <div>
                    <div key={firstdriver.id}>{firstdriver.name}</div>
                    <div key={firstdriver.id}>{firstdriver.permis}</div>
                    <div key={firstdriver.id}>{firstdriver.cin}</div>
                  </div>
                ))}</td>
                <td>{contracts.price}</td>
                <td>
                  <LinkContainer to={`/contrat/${contracts._id}`}  >
                    <Button variant='btn-default' className='btn-sm' onClick={modalShow}>
                      <i className='fas fa-edit' style={{ color: '#F9B858' }}></i>
                    </Button>
                  </LinkContainer>|
                  <Modal style={{ height: '600px', marginTop: '50px' }} show={disp} onHide={modalClose}>
                    <Modal.Header style={{ backgroundColor: '#FAF5E8' }} closeButton>
                      <div>
                        <i className="fas fa-car-side fa-5x icon"></i>
                        <p>Veuillez ajouter les informations du véhicule à ajouter.</p>
                      </div>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: '#FAF5E8' }}>
                      <Row>
                        <Col>
                          Premier Conducteur<hr></hr>
                          <form>
                            <div class="form-group">
                              <input type="text" className="bordure form-control"
                                placeholder='Premier Conducteur'
                                value={fdname}
                                onChange={(e) => setFdname(e.target.value)}></input>
                            </div>
                            <div class="form-group">
                              <input type="text" className="bordure form-control"
                                placeholder='Numéro de permis'
                                value={fdpermis}
                                onChange={(e) => setFdpermis(e.target.value)}></input>
                            </div>
                            <Row><Col><div class="form-group">
                              <input type="text" className="bordure form-control"
                                placeholder='CIN/Passeport'
                                value={fdidentifier}
                                onChange={(e) => setFdidentifier(e.target.value)}></input>
                            </div>
                            </Col>
                              <Col>
                                <div class="form-group">
                                  <input type="text" className="bordure form-control"
                                    placeholder="Date d'émission"
                                    value={fdemission}
                                    onChange={(e) => setFdemission(e.target.value)}></input>
                                </div>
                              </Col>
                            </Row>
                          </form>
                        </Col>
                        <Col>
                          Deuxiéme Conducteur<hr></hr>
                          <form>
                            <div class="form-group">
                              <input type="text" className="bordure form-control"
                                placeholder='Deuxiéme conducteur'
                                value={sdname}
                                onChange={(e) => setSdname(e.target.value)}></input>
                            </div>
                            <div class="form-group">
                              <input type="text" className="bordure form-control"
                                placeholder='Numéro de permis'
                                value={sdpermis}
                                onChange={(e) => setSdpermis(e.target.value)}></input>
                            </div>
                            <Row><Col>
                              <div class="form-group">
                                <input type="text" className="bordure form-control"
                                  placeholder='CIN/Passeport'
                                  value={sdidentifier}
                                  onChange={(e) => setSdidentifier(e.target.value)}></input>
                              </div>
                            </Col>
                              <Col>
                                <div class="form-group">
                                  <input type="text" className="bordure form-control"
                                    placeholder="Date d'émission"
                                    value={sdemission}
                                    onChange={(e) => setSdemission(e.target.value)}></input>
                                </div>
                              </Col></Row>
                          </form>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          Voiture<hr></hr>
                          <form>
                            <div class="form-group">
                              <input type="text" className="bordure form-control"
                                placeholder="Modele"
                                value={modele}
                                onChange={(e) => setModele(e.target.value)}></input>
                            </div>
                            <div class="form-group">
                              <input type="text" className="bordure form-control"
                                placeholder="Chassis"
                                value={chassis}
                                onChange={(e) => setChassis(e.target.value)}></input>
                            </div>
                            <div class="form-group">
                              <input type="text" className="bordure form-control"
                                placeholder="Matricule"
                                value={matricule}
                                onChange={(e) => setMatricule(e.target.value)}></input>
                            </div>
                          </form>
                        </Col>
                        <Col>
                          Données de location<hr></hr>
                          <form>
                            <div class="form-group">
                              <input type="text" className="bordure form-control"
                                placeholder="Prix de location par jour"
                                value={priceperday}
                                onChange={(e) => setPriceperday(e.target.value)}></input>
                            </div>
                            <div class="form-group">
                              <input type="text" className="bordure form-control"
                                placeholder="Montant de location"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}></input>
                            </div>
                          </form>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          Période de location<hr></hr>
                          Du <input type='date' className="bordure form-control"
                            onChange={(e) => setDatedebut(e.target.value)}></input>
                          Au <input type='date' className="bordure form-control"
                            onChange={(e) => setDatefin(e.target.value)}></input>
                        </Col>
                        <Col>
                          Cautionnement<hr></hr>
                          <strong className='pr-5'>Cautionnement</strong>
                          <label for="oui">Oui</label>
                          <input type="radio" id="female" name="gender" value="bond" />
                          <label for="non">Non</label>
                          <input type="radio" id="female" name="gender" value="bond" />
                          <div class="form-group">
                            <input type="text" className="bordure form-control"
                              placeholder="Montant de cautionnement"
                              value={bond}
                              onChange={(e) => setBond(e.target.value)}></input>
                          </div>
                          <strong className='pr-3'>Paiement</strong>
                          <label for="cheque">Par chéque</label>
                          <input type="radio" id="paiement" name="paiement" value="paiement" />
                          <label for="espece">En espéce</label>
                          <input type="radio" id="paiement" name="paiement" value="paiement" />
                          <div className='pt-4 pb-2 '>
                            <button className='paybtn bordure' onClick={updateContractHandler}>
                              Modifier le contrat et voir
                            </button>
                          </div>
                          <div className='pt-2 pb-2'>
                            <button className='paybtn bordure'>
                              Modifier le contrat et imprimer
                            </button>
                          </div>
                          Aprés l'enregistrement, le contrat va être ajouté dans la section contrats
                        </Col>
                      </Row>
                    </Modal.Body>
                  </Modal>
                  <Button
                    variant='btn-default'
                    className='btn-sm' onClick={jsPdfGenerator}>
                    <i class="fa fa-download" aria-hidden="true" style={{ color: "#A6D8DB" }}></i>
                  </Button>|
                  <Button
                    variant='btn-default'
                    className='btn-sm'
                    onClick={() => deleteHandler(contracts._id)}>
                    <i className='fas fa-trash-alt' style={{ color: 'red' }} ></i>
                  </Button></td>
              </tr>))}
          </tbody>
        </Table>
      }
    </Container >
  )
}
export default ContractScreen
