import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'
import { getUserDetails, updateUserProfile } from '../actions/userActions.js'

const ProfileScreen = ({ location, history }) => {

    const [nom, setNom] = useState('')
    const [email, setEmail] = useState('')
    const [motdepasse, setMotdepasse] = useState('')
    const [confirmMotdepasse, setConfirmMotdepasse] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails
    console.log('userdetails', user)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success } = userUpdateProfile

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!userInfo.nom) {
                dispatch(getUserDetails('profile'))
            } else {
                setNom(userInfo.nom)
                setEmail(userInfo.email)
            }
        }
    }, [dispatch, history, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        // if (motdepasse !== confirmMotdepasse) {
        //     setMessage("Mot de passe incorrecte")
        // } else {
        //     dispatch(updateUserProfile({ nom, email, motdepasse }))
        // }

    }
    return (
        <Container>
            <Row>
                <Col>
                    <h2>Profil</h2>
                    {message && <Message variant='danger'>{message}</Message>}
                    {success && <Message variant='success'>Profil modifié</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    {loading && <Loader />}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='nom'>
                            <Form.Label>Nom</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Nom'
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='admin@ulysse.media'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='motdepasse'>
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='******'
                                value={motdepasse}
                                onChange={(e) => setMotdepasse(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='motdepasse1'>
                            <Form.Label>Confirmer le mot de passe</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='******'
                                value={confirmMotdepasse}
                                onChange={(e) => setConfirmMotdepasse(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Button type='submit' variant='primary'>
                            Modifier
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default ProfileScreen
