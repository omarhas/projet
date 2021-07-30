import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import './Footer.css'
import logo from '../pic/logo.png'
import { logout } from '../actions/userActions.js';

const Footer = () => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        <div>
            {userInfo ? <footer className='pt-5'>
                {/* <div className='footerr '>
                <Row>
                    <div className='col-xs-6 col-sm-3 footer-items' >
                        <h6>MENU</h6>
                        <hr align='left' className='line'></hr>
                        <a href='/' alt='service'>Service</a>
                        <a href='/' alt='tarif'>Tarif</a>
                        <a href='/' alt='application'>Application</a>
                        <a href='/' alt='a propos'>A propos</a>
                        <a href='/' alt='Contact'>Contact</a>
                    </div>
                    <div className='col-xs-6 col-sm-3 footer-items' >
                        <h6>NOUS SOMMES Là POUR VOUS</h6>
                        <hr align='left' className='line'></hr>
                        Notre slogan ici...
                    </div>
                    <div className='col-xs-6 col-sm-3 footer-items' >
                        <h6>DECONNEXION</h6>
                        <hr align='left' className='line'></hr>
                        Au revoir!<br></br>
                        {userInfo ? (<button onClick={logoutHandler} className="my-3 signoutbtn">
                            Déconneter maintenant
                        </button>) : <LinkContainer to='/login' >
                            <Nav.Link><button> Connexion </button></Nav.Link>
                        </LinkContainer>}
                    </div>
                    <div className='col-xs-6 col-sm-3 footer-items' >
                        <a href='/'>
                            <img src={logo} alt='logo' className='logofooter' />
                        </a>
                        <span>Suivez nous sur <br></br> Facebook</span><br></br>
                        <a href="https://www.facebook.com/Digirent-108118428122047"><i class="fab fa-facebook fa-2x"></i></a>
                    </div>
                </Row>
            </div> */}
                <div className='copyright'>
                    <Row>
                        <Col className='text-center py-3' >
                            2021 Ulysse Media. All rights reserved
                        </Col>
                    </Row>
                </div>
            </footer>
                : <div></div>}
        </div>
    )
}

export default Footer
