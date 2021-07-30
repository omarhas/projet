import React from 'react';
import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

function tryy() {
    const notification = () => {
        store.addNotification({
            title: 'Membre',
            message: 'Membre ajouté avec succée',
            type: 'warning',
            container: 'top-right',
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            width: 500,
            dismiss: {
                duration: 4000
            }
        })
    }
    return (
        <>
            <ReactNotification />
            <button onClick={notification}>
                Add notification
      </button>
        </>
    )
}
export default tryy