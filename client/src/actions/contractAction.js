import axios from 'axios'
import {
    ADD_CONTRACT_FAIL,
    ADD_CONTRACT_REQUEST,
    ADD_CONTRACT_SUCCESS,
    CONTRACT_LIST_FAIL,
    CONTRACT_LIST_REQUEST,
    CONTRACT_LIST_SUCCESS,
    DELETE_CONTRACT_FAIL,
    DELETE_CONTRACT_REQUEST,
    DELETE_CONTRACT_SUCCESS
} from '../constants/contractConstants.js'

export const creer = (fdname, fdpermis, fdidentifier, fdemission, sdname, sdpermis, sdidentifier, sdemission, modele, chassis, matricule, price, priceperday, bond, datedebut, datefin) => async (dispatch) => {
    try {
        dispatch({ type: ADD_CONTRACT_REQUEST })

        const { data } = await axios.post('/api/contrat', { fdname, fdpermis, fdidentifier, fdemission, sdname, sdpermis, sdidentifier, sdemission, modele, chassis, matricule, price, priceperday, bond, datedebut, datefin })
        dispatch({ type: ADD_CONTRACT_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ADD_CONTRACT_FAIL, payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const listContract = () => async (dispatch) => {
    try {
        dispatch({ type: CONTRACT_LIST_REQUEST })

        const { data } = await axios.get('/api/contrat')
        dispatch({ type: CONTRACT_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: CONTRACT_LIST_FAIL, payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const supprimerContrat = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_CONTRACT_REQUEST })

        await axios.delete(`/api/contrat/${id}`)
        dispatch({ type: DELETE_CONTRACT_SUCCESS })
    } catch (error) {
        dispatch({
            type: DELETE_CONTRACT_FAIL, payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}