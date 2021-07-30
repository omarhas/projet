import {
    CAR_LIST_REQUEST,
    CAR_LIST_SUCCESS,
    CAR_LIST_FAIL,
    CAR_DELETE_REQUEST,
    CAR_DELETE_SUCCESS,
    CAR_DELETE_FAIL,
    CAR_ADD_REQUEST,
    CAR_ADD_SUCCESS,
    CAR_ADD_FAIL,
    CAR_NUMBER_REQUEST,
    CAR_NUMBER_SUCCESS,
    CAR_NUMBER_FAIL
} from '../constants/carContsants.js'
import axios from 'axios'

export const listCars = () => async (dispatch) => {
    try {
        dispatch({ type: CAR_LIST_REQUEST })
        const { data } = await axios.get('/api/cars')
        dispatch({ type: CAR_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: CAR_LIST_FAIL, payload: error.message })
    }
}

export const deleteCar = (id) => async (dispatch) => {
    try {
        dispatch({ type: CAR_DELETE_REQUEST })
        await axios.delete(`/api/cars/${id}`)
        dispatch({ type: CAR_DELETE_SUCCESS })
    } catch (error) {
        dispatch({
            type: CAR_DELETE_FAIL, payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const addCar = (modele, matricule, chassis, status) => async (dispatch) => {
    try {
        dispatch({ type: CAR_ADD_REQUEST })
        const { data } = await axios.post(`/api/cars`, { modele, matricule, chassis, status })
        dispatch({ type: CAR_ADD_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: CAR_ADD_FAIL, payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const howMany = () => async (dispatch) => {
    try {
        dispatch({ type: CAR_NUMBER_REQUEST })

        const { data } = await axios.get('/api/cars')
        dispatch({ type: CAR_NUMBER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: CAR_NUMBER_FAIL, payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}