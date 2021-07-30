import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'
import { register } from '../actions/userActions.js'
import FormContainer from '../components/FormContainer.js'

const RegisterScreen = ({ location, history }) => {

    const [nom, setNom] = useState('')
    const [email, setEmail] = useState('')
    const [motdepasse, setMotdepasse] = useState('')
    const [confirmMotdepasse, setConfirmMotdepasse] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const submitHandler = (e) => {
        e.preventDefault()
        if (motdepasse !== confirmMotdepasse) {
            setMessage("Mot de passe incorrecte")
        } else {
            dispatch(register(nom, email, motdepasse))
        }
    }
    return (
        <FormContainer>
            <h1>S'inscrire</h1>
            {message && <Message variant='danger'>{message}</Message>}
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

                <Form.Group controlId='motdepasse'>
                    <Form.Label>Confirmer le mot de passe</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='******'
                        value={confirmMotdepasse}
                        onChange={(e) => setConfirmMotdepasse(e.target.value)}></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    S'inscrire
                </Button>
                <Row className='py-3'>
                    <Col>
                        Avez-vous un compte ?{' '}
                        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                            Connexion
                        </Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default RegisterScreen
