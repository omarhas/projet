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
    CAR_NUMBER_SUCCESS,
    CAR_NUMBER_FAIL,
    CAR_NUMBER_REQUEST
} from '../constants/carContsants.js'

export const carListReducer = (state = { cars: [] }, action) => {
    switch (action.type) {
        case CAR_LIST_REQUEST:
            return { loading: true, cars: [] }
        case CAR_LIST_SUCCESS:
            return { loading: false, cars: action.payload }
        case CAR_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const carDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case CAR_DELETE_REQUEST:
            return { loading: true }
        case CAR_DELETE_SUCCESS:
            return { loading: false, success: true }
        case CAR_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const carAddReducer = (state = {}, action) => {
    switch (action.type) {
        case CAR_ADD_REQUEST:
            return { loading: true }
        case CAR_ADD_SUCCESS:
            return { loading: false, success: true, car: action.payload }
        case CAR_ADD_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const carNumberReducer = (state = { cars: [] }, action) => {
    switch (action.type) {
        case CAR_NUMBER_REQUEST:
            return {
                loading: true, cars: action.payload
            }
        case CAR_NUMBER_SUCCESS:
            return { loading: false, success: true, cars: action.payload.length }
        case CAR_NUMBER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}