import {
    AGENCY_REGISTER_FAIL,
    AGENCY_REGISTER_REQUEST,
    AGENCY_REGISTER_SUCCESS,
    AGENCY_LIST_REQUEST,
    AGENCY_LIST_SUCCESS,
    AGENCY_LIST_FAIL
} from "../constants/agencyConstants"

export const agencyAddReducer = (state = {}, action) => {
    switch (action.type) {
        case AGENCY_REGISTER_REQUEST:
            return { loading: true }
        case AGENCY_REGISTER_SUCCESS:
            return { loading: false, success: true, agency: action.payload }
        case AGENCY_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const agencyListReducer = (state = { agency: [] }, action) => {
    switch (action.type) {
        case AGENCY_LIST_REQUEST:
            return { loading: true, agency: [] }
        case AGENCY_LIST_SUCCESS:
            return { loading: false, agency: action.payload }
        case AGENCY_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}