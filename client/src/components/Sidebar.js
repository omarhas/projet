import React, { useSelector, useEffect } from 'react'
import './Sidebar.css';
import { SidebarData } from './SidebarData';
import logo from '../pic/logo.png'

const Sidebar = ({ history }) => {

    // const userLogin = useSelector(state => state.userLogin)
    // const { userInfo } = userLogin
    // console.log("userinfo", userInfo)
    // useEffect(() => {
    //     if (!userInfo) {
    //         history.push('/login')
    //     }
    // }, [userInfo, history])

    return (
        <div className='App' responsive>
            <div className="Sidebar">
                <ul className='SidebarList'>
                    <a href='/'>
                        <img src={logo} alt='logo' className='logoo' />
                    </a>
                    {SidebarData.map((val, key) => {
                        return (
                            <li
                                key={key}
                                id={window.location.pathname === val.link ? "active" : ""}
                                className="row" onClick={() => { window.location.pathname = val.link }}>
                                <div id="icon"> {val.icon} </div>
                                <div id="title"> {val.title} </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;
