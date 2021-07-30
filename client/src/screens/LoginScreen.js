import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const LoginScreen = ({ location, history }) => {

    const [email, setEmail] = useState('')
    const [motdepasse, setMotdepasse] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/dashboard'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [userInfo, history, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, motdepasse))
    }
    return (
        <FormContainer >
            <h1>Connexion</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
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
                <Button type='submit' variant='primary'>
                    Connexion
                </Button>
                {/* <Row className='py-3'>
                    <Col>
                        Nouveau utilisateur?{' '}
                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                            S'inscrire
                        </Link>
                    </Col>
                </Row> */}
            </Form>
        </FormContainer>
    )
}

export default LoginScreen
