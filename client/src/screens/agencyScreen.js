// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { createAgency, listAgency } from '../actions/agencyAction'
// import { Modal, Button } from 'react-bootstrap'
// import './popup.css'

// const AgencyScreen = ({ history }) => {
//     const [name, setName] = useState('')
//     const [address, setAddress] = useState('')
//     const [email, setEmail] = useState('')
//     const [phone, setPhone] = useState('')

//     const [manifest, setManifest] = useState(false);
//     const handleExit = () => setManifest(false);
//     const handleManifest = () => setManifest(true);

//     const agencyAdd = useSelector(state => state.agencyAdd)
//     const { loading, success, error } = agencyAdd

//     const agencyList = useSelector(state => state.agencyList)
//     const { agency } = agencyList

//     const userLogin = useSelector(state => state.userLogin)
//     const { userInfo } = userLogin

//     const dispatch = useDispatch()

//     const createAgencyHandler = (e) => {
//         e.preventDefault()
//         dispatch(createAgency(name, address, email, phone))
//     }

//     useEffect(() => {
//         if (!userInfo) {
//             history.push('/login')
//         } else {
//             dispatch(listAgency())
//             dispatch(createAgency())
//         }
//     }, [dispatch, userInfo, history])
//     return (
//         <div>
//             <Button style={{ backgroundColor: '#EF8842', borderColor: '#EF8842' }} onClick={handleManifest}>
//                 <i className='fas fa-plus'></i> Add agency
//                 </Button>
//             <Modal style={{ height: '600px', marginTop: '50px' }} show={manifest} onHide={handleExit}>
//                 <Modal.Header style={{ backgroundColor: '#FAF5E8' }} closeButton>
//                     <div>
//                         <i className="fas fa-car-side fa-5x icon"></i>
//                         <p>Veuillez ajouter les informations de votre agence.</p>
//                     </div>
//                 </Modal.Header>
//                 <Modal.Body style={{ backgroundColor: '#FAF5E8' }}>
//                     <form>
//                         <div class="form-group">
//                             <input type="text" className="bordure form-control"
//                                 placeholder='Nom'
//                                 value={name}
//                                 onChange={(e) => setName(e.target.value)}></input>
//                         </div>
//                         <div class="form-group">
//                             <input type="text" className="bordure form-control"
//                                 placeholder='Adresse'
//                                 value={address}
//                                 onChange={(e) => setAddress(e.target.value)}></input>
//                         </div>
//                         <div class="form-group">
//                             <input type="text" className="bordure form-control"
//                                 placeholder='Email'
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}></input>
//                         </div>
//                         <div class="form-group">
//                             <input type="text" className="bordure form-control"
//                                 placeholder='Numéro de téléphone'
//                                 value={phone}
//                                 onChange={(e) => setPhone(e.target.value)}></input>
//                         </div>
//                     </form>
//                     <button className='bouton' onClick={createAgencyHandler}>Sauvegarder les informations</button>
//                     <p>Après le sauvegarde, vous pouvez revenir à modifier les données de l'agence quand vous voulez</p>
//                 </Modal.Body>
//             </Modal>
//             {agency.map((agency) => (
//                 <div key={agency._id}>
//                     {agency.name}
//                 </div>
//             ))}
//         </div>
//     )
// }

// export default AgencyScreen
