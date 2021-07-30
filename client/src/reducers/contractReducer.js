import {
    ADD_CONTRACT_REQUEST,
    ADD_CONTRACT_SUCCESS,
    ADD_CONTRACT_FAIL,
    CONTRACT_LIST_REQUEST,
    CONTRACT_LIST_SUCCESS,
    CONTRACT_LIST_FAIL,
    DELETE_CONTRACT_REQUEST,
    DELETE_CONTRACT_SUCCESS,
    DELETE_CONTRACT_FAIL
} from '../constants/contractConstants.js'

export const addContractReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_CONTRACT_REQUEST:
            return { loading: true }
        case ADD_CONTRACT_SUCCESS:
            return { loading: false, success: true, contract: action.payload }
        case ADD_CONTRACT_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const contractListReducer = (state = { contracts: [] }, action) => {
    switch (action.type) {
        case CONTRACT_LIST_REQUEST:
            return { loading: true, contracts: [] }
        case CONTRACT_LIST_SUCCESS:
            return { loading: false, contracts: action.payload }
        case CONTRACT_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const deleteContractReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_CONTRACT_REQUEST:
            return { loading: true }
        case DELETE_CONTRACT_SUCCESS:
            return { loading: false, success: true }
        case DELETE_CONTRACT_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}