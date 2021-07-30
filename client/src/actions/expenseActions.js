import axios from 'axios'
import {
    EXPENSE_LIST_REQUEST,
    EXPENSE_LIST_SUCCESS,
    EXPENSE_LIST_FAIL,
    EXPENSE_DELETE_FAIL,
    EXPENSE_DELETE_REQUEST,
    EXPENSE_DELETE_SUCCESS,
    CREATE_EXPENSE_SUCCESS,
    CREATE_EXPENSE_REQUEST,
    CREATE_EXPENSE_FAIL,
    UPDATE_EXPENSE_REQUEST,
    UPDATE_EXPENSE_SUCCESS,
    UPDATE_EXPENSE_FAIL
} from '../constants/ExpenseContants.js'

export const listExpenses = () => async (dispatch) => {
    try {
        dispatch({ type: EXPENSE_LIST_REQUEST })
        const { data } = await axios.get('/api/expenses')

        dispatch({ type: EXPENSE_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: EXPENSE_LIST_FAIL, payload: error.message })
    }
}

export const supprimer = (id) => async (dispatch) => {
    try {
        dispatch({ type: EXPENSE_DELETE_REQUEST })

        await axios.delete(`api/expenses/${id}`)

        dispatch({ type: EXPENSE_DELETE_SUCCESS })
    } catch (error) {
        dispatch({
            type: EXPENSE_DELETE_FAIL, payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const ajouter = (type, montant) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_EXPENSE_REQUEST })

        const { data } = await axios.post(`api/expenses`, { type, montant })

        dispatch({ type: CREATE_EXPENSE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: CREATE_EXPENSE_FAIL, payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const update = (id) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_EXPENSE_REQUEST
        })
        const config = {
            header: {
                'Content-Type': 'application/json',
            }
        }
        const { data } = await axios.put(`/api/expenses/${id}`, config)
        dispatch({
            type: UPDATE_EXPENSE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_EXPENSE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

