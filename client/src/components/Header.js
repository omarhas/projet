import React from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { logout } from '../actions/userActions.js'

const Header = () => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        <header>
            <Navbar>
                <Container>
                    <Nav>
                        {userInfo ? (
                            <NavDropdown title={userInfo.nom} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler} >Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : <LinkContainer to='/login' >
                            <Nav.Link><button > Connexion </button></Nav.Link>
                        </LinkContainer>}
                    </Nav>
                </Container>
            </Navbar>
        </header>
    )
}
export default Header