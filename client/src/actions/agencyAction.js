import {
    AGENCY_LIST_FAIL,
    AGENCY_LIST_REQUEST,
    AGENCY_LIST_SUCCESS,
    AGENCY_REGISTER_FAIL,
    AGENCY_REGISTER_REQUEST,
    AGENCY_REGISTER_SUCCESS
} from '../constants/agencyConstants.js'
import axios from 'axios'

export const createAgency = (name, address, email, phone) => async (dispatch) => {
    try {
        dispatch({ type: AGENCY_REGISTER_REQUEST })
        const { data } = await axios.post('/api/agency', { name, address, email, phone })
        dispatch({ type: AGENCY_REGISTER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: AGENCY_REGISTER_FAIL, payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const listAgency = () => async (dispatch) => {
    try {
        dispatch({ type: AGENCY_LIST_REQUEST })
        const { data } = await axios.get('/api/agency')

        dispatch({ type: AGENCY_LIST_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: AGENCY_LIST_FAIL, payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}